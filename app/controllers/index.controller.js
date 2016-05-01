'use strict';

exports.render = (req, res) => {
  res.render('index', { title: 'Fatal Accidents By County 2013' });
}
