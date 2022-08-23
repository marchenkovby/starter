import del from 'del';

export const reset = () => {
  return del([
    app.path.files.clean,
    app.path.scripts.clean,
    app.path.styles.clean,
    app.path.pages.clean,
    app.path.images.clean,
    `${app.path.srcFolder}/pages/includes/components.pug`,
    `${app.path.srcFolder}/styles/includes/components.sass`,
    `${app.path.srcFolder}/scripts/components.js`,
    // Для исключения файла
    //`!${app.path.buildFolder}/functions.php`,
  ])
}