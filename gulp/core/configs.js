export const notifyPagesConfig = {
  title: "PAGES"
}

export const pugConfig = {
  doctype: 'html',
  pretty: true,
  verbose: true
}

export const versionNumberConfig = {
  'value': '%DT%',
  'append': {
    'key': 'v',
    'cover': 0,
    'to': [
      'css',
      'js',
    ]
  }
}

export const htmlminConfig = {
  collapseWhitespace: true
}

export const renameConfig = {
  extname: '.php'
}

export const notifyScriptsConfig = {
  title: "SCRIPTS"
}

export const webpackStreamConfig = {
  mode: process.argv.includes('--build') ? 'production' : 'development',
  output: {
    filename: 'scripts.js',
  }
}

export const notifyStylesConfig = {
  title: "STYLES",
}

export const autoprefixerConfig = {
  grid: true,
  overrideBrowserslist: ['last 3 versions']
}

export const replaceConfig = `/@charset "UTF-8";\n\n/, ''`;

export const cleanCssConfig = {
  // level: {
  //   1: {
  //     specialComments: 0,
  //     removeEmpty: true,
  //     removeWhitespace: true
  //   },
  //   2: {
  //     mergeMedia: true,
  //     removeEmpty: true,
  //     removeDuplicateFontRules: true,
  //     removeDuplicateMediaBlocks: true,
  //     removeDuplicateRules: true,
  //     removeUnusedAtRules: false
  //   }
  // }
}

export const notifyImagesConfig = {
  title: "IMAGES"
}

export const imageminConfig = {
  // progressive: true,
  // svgoPlugins: [{ removeViewBox: false }],
  // interplaced: true,
  // optimizationLevel: 3 // 0 to 7
}

export const browsersyncConfig = {
  // server: {
  //   baseDir: `${app.path.buildFolder}`,
  //   index: 'test.html'
  // },
  notify: false,
  external: false,
  //port: 3000,
  open: true,
  proxy: 'http://starter.loc',
}
