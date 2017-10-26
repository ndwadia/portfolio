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
