import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import csscomb from 'gulp-csscomb';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sassGlob from 'gulp-sass-glob';
import cssbeautify from 'gulp-cssbeautify';
import { buildComponents, importBlocks } from '../core/functions.js';
import { notifyStylesConfig, autoprefixerConfig } from '../core/configs.js';

const sass = gulpSass(dartSass);

export const buildStyles = () => {
  //buildComponents('styles');
  importBlocks('styles');
  return app.gulp.src(app.path.styles.src, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(app.plugins.notify.onError(notifyStylesConfig)))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(cssbeautify())
    .pipe(app.plugins.if(app.isBuild, autoprefixer(autoprefixerConfig)))
    .pipe(csscomb())
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(app.gulp.dest(app.path.styles.build))
    .pipe(app.plugins.browsersync.stream())
}
