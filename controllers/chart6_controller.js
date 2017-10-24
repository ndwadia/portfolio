var db = require('../db');
exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
      $group: {
        _id: "$ORIGIN",
        count_all: {
          $sum: 1
        },
        count_cancelled: {
          $sum: {
            $cond: [{
              $gt: [
                "$CANCELLED",
                0
              ]
            }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        count_all: 1,
        count_cancelled: 1,
        percent_cancelled: {
          $multiply: [{
            $divide: [100, "$count_all"]
          }, "$count_cancelled"]
        }
      }
    },
    {
      $sort: {
        percent_cancelled: -1
      }
    },
    {
      $limit: 10
    }
  ]).toArray(function(err, results) {
    if (err) throw err;
    // console.log(results);
    var dim1 = [];
    var series1 = [];
    for (var index in results) {
      var doc = results[index];
      var origin = doc._id;
      var percent = Math.round(100 * doc.percent_cancelled) / 100;
      dim1.push(origin);
      series1.push(percent);
    }
    var resObj = {
      "labels": dim1,
      "data": series1
    };
    res.status(200).json(resObj);
  });
};
