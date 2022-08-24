import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import through2 from 'through2';
import { getClassesToComponentList, buildComponents } from '../core/functions.js';
import { notifyPagesConfig, pugConfig, versionNumberConfig, htmlminConfig, renameConfig } from '../core/configs.js';

export const buildPages = () => {
  buildComponents('pages');
  return app.gulp.src(app.path.pages.src)
    .pipe(app.plugins.plumber(app.plugins.notify.onError(notifyPagesConfig)))
    .pipe(pug(pugConfig))
    .pipe(app.plugins.if(app.isDev, versionNumber(versionNumberConfig)))
    .pipe(app.plugins.if(app.isBuild, htmlmin(htmlminConfig)))
    //.pipe(rename(renameConfig))
    .pipe(through2.obj(getClassesToComponentList))
    .pipe(app.gulp.dest(app.path.pages.build))
    .pipe(app.plugins.browsersync.stream())
}