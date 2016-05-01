'use strict';

module.exports = (app) => {
  let countyDetails = require('../controllers/countydetails.controller');

  app.get('/county/:countyname', countyDetails.render);

  app.post('/county', countyDetails.handlepost);
}
