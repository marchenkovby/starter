import fs from 'fs';
import getClassesFromHtml from 'get-classes-from-html';

let listClassesFromPage = [];
let importsList = {sass: [], js: []};
let messageMainFileComponent = 'Этот файл генерируется автоматически.\n\n';

function getClassesToComponentList(file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  const content = file.contents.toString();
  let classes = getClassesFromHtml(content);
  for (let el of classes) {
    if (/(__|--)/.test(el) || listClassesFromPage.includes(el)) continue;
    listClassesFromPage.push(el);
  }
  console.log("---------- Used HTML components: " + listClassesFromPage.join(", "));
  file.contents = new Buffer.from(content);
  this.push(file);
  cb();
  return listClassesFromPage;
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
    listClassesFromPage.forEach(function(componentName ) {
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
  listClassesFromPage = [];
}
export { buildComponents }

function importBlocks(typeTask) {

  // Задаю пустой список 
  let list = [];

  // Сохраняю сообщение в общий файл для используемых компонентов
  let mainFileComponent = messageMainFileComponent;
  
  // Если данная функция вызывается для задачи scripts, то использую расширение js, иначе sass
  let extensionFileComponent = typeTask == 'scripts' ? 'js' : 'sass';

  // Список классов компонентов
  // Пример: page, article, footer и др.
  const listClassesComponents = getDirectories(extensionFileComponent);

  // Проверяю есть ли у класса, найденного на странице, соотвествующий ему класс компонента
  listClassesComponents.forEach(classComponent => {

    // Присваиваю переменной полный путь до компонента
    let url = `../../components/${classComponent}/${classComponent}`;
    
    // Если в списке классов, найденных на странице, есть класс компонента, 
    // то полный путь этого компонента записываю в общий файл компонентов
    if (listClassesFromPage.includes(classComponent)) {

      // Сохраняю пути всех используемых компонентов
      mainFileComponents += extensionFileComponent  == 'js' ? `import '${url}.js';\n` : `@import '${url}'\n`;
    }

    // Создаю общий файл компонентов для определенного расширения
    fs.writeFileSync(`${app.path.srcFolder}/${typeTask}/includes/components.${extensionFileComponent }`, mainFileComponents);

  });

  if (getDifference(list, importsList[extension]).length) {
    let require = "/* blocks that used */\n\n";
    list.forEach(el => {
      require += extension == "js" ? `import '${el}.js';\n` : `@import '${el}'\n`;
    });
    fs.writeFileSync(`./src/${type}/includes/components.${extension}`, require);
    importsList[extension] = list;
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
