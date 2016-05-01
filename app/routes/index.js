'use strict';

module.exports = (app) => {
  let index = require('../controllers/index.controller');

  app.get('/', index.render);
}
