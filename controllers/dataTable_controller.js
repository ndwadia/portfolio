var db = require('../db');
exports.getData = function(req, res) {
  var _origin = req.query.origin;
  var flights = db.get().collection('flights');
  flights.find({
    CANCELLED: {
      $gt: 0
    },
    ORIGIN: {
      $eq: _origin
    }
  }, {
    _id: 0,
    CARRIER: 1,
    DEST: 1,
    FL_DATE: 1,
    CRS_DEP_TIME: 1,
    CANCELLATION_CODE: 1
  }).limit(100).sort({
    CARRIER: 1
  }).toArray(function(err, result) {
    if (err) throw err;
    var dataObj = {};
    dataObj.data = result;
    res.status(200).json(dataObj);
  });
};
exports.searchOrigin = function(req, res) {
  var term = req.query.term;
  var term2 = "^" + term.toUpperCase();
  var regex = new RegExp(term2);
  var flights = db.get().collection('flights');
  flights.distinct("ORIGIN", {
    "ORIGIN": regex
  }, function(err, result) {
    if (err) throw err;
    var result2 = result.sort();
    var result3 = result2.slice(0, 20);
    res.status(200).json(result3);
  });
};
