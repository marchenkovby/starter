import { browsersyncConfig } from "../core/configs.js";

export const server = (done) => {
  app.plugins.browsersync.init(browsersyncConfig);
}