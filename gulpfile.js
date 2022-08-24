import gulp from 'gulp';

import { path } from './gulp/core/path.js';

import { plugins } from './gulp/core/plugins.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

import { reset } from './gulp/tasks/reset.js';
import { buildPages } from './gulp/tasks/buildPages.js';
import { server } from './gulp/tasks/server.js';
import { buildStyles } from './gulp/tasks/buildStyles.js';
import { buildScripts } from './gulp/tasks/buildScripts.js';
import { compressImages } from './gulp/tasks/compressImages.js';
import { copyFiles} from './gulp/tasks/copyFiles.js';

function watcher() {
  gulp.watch(path.pages.watch, gulp.series(buildPages, buildStyles, buildScripts)),
  //gulp.watch(path.pages.watch, buildPages),
  gulp.watch(path.styles.watch, buildStyles),
  gulp.watch(path.scripts.watch, buildScripts),
  gulp.watch(path.images.watch, compressImages),
  gulp.watch(path.files.watch, copyFiles)
}

const mainTasks = gulp.series(buildPages, buildStyles, buildScripts, copyFiles, compressImages);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

//const test = gulp.series(reset, mainTaskBuildPages, gulp.parallel(mainTaskBuildStyles, mainTaskBuildScripts));
const test =  gulp.series(reset, buildPages, buildStyles, buildScripts);

gulp.task('default', dev);

export { dev }
export { build }
export { buildPages }
export { buildStyles }
export { buildScripts }
export { compressImages }
export { copyFiles }
export { server }
export { reset }
export { test }
