import fs from 'fs';
import getClassesFromHtml from 'get-classes-from-html';

let listClassesFromHTMLpage = [];
let importsList = {sass: [], js: []};
let doNotEditMsg = 'Этот файл генерируется автоматически.\n\n';

function getClassesToComponentList(file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  const content = file.contents.toString();
  let classes = getClassesFromHtml(content);
  for (let el of classes) {
    if (/(__|--)/.test(el) || listClassesFromHTMLpage.includes(el)) continue;
    listClassesFromHTMLpage.push(el);
  }
  console.log("---------- Used HTML components: " + listClassesFromHTMLpage.join(", "));
  file.contents = new Buffer.from(content);
  this.push(file);
  cb();
  return listClassesFromHTMLpage;
}
export { getClassesToComponentList }

function buildComponents(type) {
  let mainFileComponents = '// ' + doNotEditMsg;
  let fileExtension = 'pug';
  let pathBuildFolder = `${app.path.srcFolder}/${type}/includes`;
  if (type == 'pages') {
    let allComponentsFromFolders = getDirectories(fileExtension);
    allComponentsFromFolders.forEach(function(componentName) {
      mainFileComponents += `include ../../components/${componentName}/${componentName}\n`;
    });
  }
  if (type == 'scripts' || type == 'styles') {
    fileExtension = type == 'scripts' ? 'js' : 'sass';
    let allComponentsFromFolders = getDirectories(fileExtension);
    listClassesFromHTMLpage.forEach(function(componentName ) {
      if (allComponentsFromFolders.indexOf(componentName) == -1) return;
      if (type == 'scripts') {
        mainFileComponents += `import '../../components/${componentName}/${componentName}.${fileExtension}'\n`;
      }
      if (type == 'styles') {
        mainFileComponents += `@import '../../components/${componentName}/${componentName}'\n`;
      }
    });
  }
  fs.writeFileSync(`${pathBuildFolder}/components.${fileExtension}`, mainFileComponents);
  listClassesFromHTMLpage = [];
}
export { buildComponents }


function importBlocks(type) {
  let list = [];
  let ext = type == 'scripts' ? 'js' : 'sass';
  const allBlocks = getDirectories(ext);
  allBlocks.forEach(block => {
    let url = `../../components/${block}/${block}`;
    if (listClassesFromHTMLpage.includes(block) && !list.includes(url)) list.push(url);
  });
  if (getDifference(list, importsList[ext]).length) {
    let require = "/* blocks that used */\n\n";
    list.forEach(el => {
      require += ext == "js" ? `import '${el}.js';\n` : `@import '${el}'\n`;
    });
    fs.writeFileSync(`./src/${type}/includes/components.${ext}`, require);
    importsList[ext] = list;
  }
}
export { importBlocks }

const getDifference = (a1, a2) => [...a1.filter(i => !a2.includes(i)), a2.filter(i => !a1.includes(i))];

function fileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch(e) {
    flag = false;
  }
  return flag;
}

function getDirectories(ext) {
  let source = `${app.path.componentsFolder}/`;
  let res = fs.readdirSync(source)
    .filter(item => fs.lstatSync(source + item).isDirectory())
    .filter(item => fileExist(source + item + '/' + item + '.' + ext));
  return res;
}
