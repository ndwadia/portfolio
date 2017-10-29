var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var fs = require('fs');
var path = require('path');
var nconf = require('nconf');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
require('./routes')(app);
// Connect to Mongo on start
nconf.file({ file: path.join(__dirname, 'config.json') });
var uri = nconf.get('MONGO_URL');
db.connect(uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo');
    process.exit(1);
  } else {
    app.listen(8080, function() {});
  }
});
