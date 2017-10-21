var express = require('express');
var bodyParser = require('body-parser');
var dashboard = require('./controllers/dashboard_controller');
var db = require('./db');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var uri = process.env.MONGODB_URI;
// Connect to Mongo on start
db.connect(uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    require('./routes')(app);
    app.listen(80, function() {
      console.log('Listening on port 80...');
    });
  }
});