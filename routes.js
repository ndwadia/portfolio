var express = require('express');

module.exports = function(app) {
  var chart1 = require('./controllers/chart1_controller');
  var chart2 = require('./controllers/chart2_controller');

  app.use('/', express.static('./'));
  app.get('/chart1', chart1.getData);
  app.get('/chart2', chart2.getData);
};