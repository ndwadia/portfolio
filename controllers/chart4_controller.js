var db = require('../db');
exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
      $group: {
        _id: "$ORIGIN",
        count_all: {
          $sum: 1
        },
        count_delayed: {
          $sum: {
            $cond: [{
              $gt: [
                "$DEP_DELAY",
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
        count_delayed: 1,
        percent_delayed: {
          $multiply: [{
            $divide: [100, "$count_all"]
          }, "$count_delayed"]
        }
      }
    },
    {
      $sort: {
        percent_delayed: -1
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
      var percent = Math.round(100 * doc.percent_delayed) / 100;
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
