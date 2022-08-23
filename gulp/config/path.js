import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;
const componentsFolder = `${srcFolder}/components`

export const path = {
  pages: {
    src: `${srcFolder}/pages/*.pug`,
    watch: [`${srcFolder}/pages/**/*.pug`, `${componentsFolder}/**/*.pug`, `!${srcFolder}/pages/includes/components.pug`],
    build: buildFolder,
    clean: `${buildFolder}/*.{php,html}`
  },
  styles: {
    src: `${srcFolder}/styles/styles.sass`,
    watch: [`${srcFolder}/styles/**/*.sass`, `${componentsFolder}/**/*.sass`, `!${srcFolder}/styles/includes/components.sass`],
    build: `${buildFolder}`,
    clean: `${buildFolder}/styles.css`
  },
  scripts: {
    src: `${srcFolder}/scripts/scripts.js`,
    watch: [`${srcFolder}/scripts/**/*.js`, `${componentsFolder}/**/*.js`, `!${srcFolder}/scripts/includes/components.js`],
    build: buildFolder,
    clean: `${buildFolder}/scripts.js`
  },
  images: {
    src: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,gif,ico,wepb}`,
    watch: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,gif,ico,wepb}`,
    build: `${buildFolder}/images/`,
    clean: `${buildFolder}/images/`
  },
  files: {
    src: `${srcFolder}/files/**/*.*`,
    watch: `${srcFolder}/files/**/*.*`,
    build: `${buildFolder}/files/`,
    clean:  `${buildFolder}/files/`
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  componentsFolder: componentsFolder,
}
