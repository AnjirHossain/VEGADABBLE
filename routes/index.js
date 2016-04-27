'use strict';

let mainController = require('../app/controllers/main');

module.exports = (app) => {
  app.use('/', mainController);
}
