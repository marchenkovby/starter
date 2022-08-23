export const copyFiles = () => {
  return app.gulp.src(app.path.files.src)
    .pipe(app.gulp.dest(app.path.files.build))
}