'use strict';

let request = require('request');
let apiDependencies = require('../../config/api.endpoints.accidents');
let countyCursor = require('../../utils/countyCursor');

exports.render = (req, res) => {
  request(apiDependencies.accidentsEndpoint, (error, response, body) => {
    if (!error && response.statusCode == 200) {

      // use cursor to find details by countyName
      let details;

      if ( !countyCursor(JSON.parse(body), req.params.countyname)[0] ) {
        req.flash('error', 'No matches found for this county');
        res.redirect('/');
      } else {
        details = countyCursor(JSON.parse(body), req.params.countyname)[0];

        res.render('countydetails', {
          title: 'Fatal Accidents In ' + req.params.countyname + ' County 2013',
          details: details
        });
      }
    }
  });
}

// redirect for Get Details button in home page
exports.handlepost = (req, res) => {
  let redirectHere = `/county/${req.body.countyname}`;
  res.redirect('/county/' + req.body.countyname);
}
