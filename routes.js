var express = require('express');

module.exports = function(app) {
  var chart1 = require('./controllers/chart1_controller');
  var chart2 = require('./controllers/chart2_controller');
  var chart3 = require('./controllers/chart3_controller');
  var chart4 = require('./controllers/chart4_controller');
  var chart5 = require('./controllers/chart5_controller');
  var chart6 = require('./controllers/chart6_controller');
  var bubbleChart = require('./controllers/bubbleChart_controller');
  var dataTable = require('./controllers/dataTable_controller');

  app.use('/', express.static('./'));
  app.get('/chart1', chart1.getData);
  app.get('/chart2', chart2.getData);
  app.get('/chart3', chart3.getData);
  app.get('/chart4', chart4.getData);
  app.get('/chart5', chart5.getData);
  app.get('/chart6', chart6.getData);
  app.get('/bubbleChart', bubbleChart.getData);
  app.get('/dataTable', dataTable.getData);
};