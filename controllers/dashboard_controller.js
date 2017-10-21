var db = require('../db');

exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
      $group: {
        _id: "$CARRIER",
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ], function(err, results) {
    // console.log(results);
    res.status(200).json(results);
  });
};