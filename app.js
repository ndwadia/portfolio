var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
require('./routes')(app);

// Connect to Mongo on start
var uri = process.env.MONGODB_URI;
db.connect(uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(8080, function() {
      // console.log('Listening on port 3000...');
    });
  }
});