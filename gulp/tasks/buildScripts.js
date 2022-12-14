import webpackStream from 'webpack-stream';
import { buildComponents, importBlocks } from '../core/functions.js';
import { notifyScriptsConfig, webpackStreamConfig } from '../core/configs.js';

export const buildScripts = () => {
  //buildComponents('scripts');
  importBlocks('scripts');
  return app.gulp.src(app.path.scripts.src, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(app.plugins.notify.onError(notifyScriptsConfig)))
    .pipe(webpackStream(webpackStreamConfig))
    .pipe(app.gulp.dest(app.path.scripts.build, { sourcemaps: '.' }))
    .pipe(app.plugins.browsersync.stream())
}
