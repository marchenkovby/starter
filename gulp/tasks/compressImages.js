import imagemin from 'gulp-imagemin';
import { notifyImagesConfig, imageminConfig } from '../core/configs.js';

export const compressImages = () => {
  return app.gulp.src(app.path.images.src, { sourcemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError(notifyImagesConfig)))
    //.pipe(imagemin(imageminConfig))
    .pipe(app.gulp.dest(app.path.images.build))
    .pipe(app.plugins.browsersync.stream())
}