import { browsersyncConfig } from "../config/config.js";

export const server = (done) => {
  app.plugins.browsersync.init(browsersyncConfig);
}