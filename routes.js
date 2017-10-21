var express = require('express');

module.exports = function(app) {
  var dashboard = require('./controllers/dashboard_controller');

  app.use('/', express.static('./'));
  app.get('/dashboard', dashboard.getData);
};