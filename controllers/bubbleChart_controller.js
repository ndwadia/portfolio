var db = require('../db');
exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
      $group: {
        _id: "$CARRIER",
        count_all: {
          $sum: 1
        },
        count_delayed: {
          $sum: {
            $cond: [{
              $gt: [
                "$ARR_DELAY",
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
        _id: 1
      }
    }
  ]).toArray(function(err, results) {
    if (err) throw err;
    // console.log(results);
    var dim1 = [];
    var series1 = [];
    var series2 = [];
    var series3 = [];
    for (var index in results) {
      var doc = results[index];
      var carrier = doc._id;
      var percent = Math.round(100 * doc.percent_delayed) / 100;
      dim1.push(carrier);
      series1.push(percent);
    }
    flights.aggregate([{
        $match: {
          ARR_DELAY: {
            $gt: 0
          }
        }
      },
      {
        $group: {
          _id: "$CARRIER",
          avg_DEP_DELAY: {
            $avg: "$DEP_DELAY"
          },
          avg_ARR_DELAY: {
            $avg: "$ARR_DELAY"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]).toArray(function(err, results) {
      if (err) throw err;
      for (var index in results) {
        var doc = results[index];
        var avg_dep_delay = Math.round(100 * doc.avg_DEP_DELAY) / 100;
        var avg_arr_delay = Math.round(100 * doc.avg_ARR_DELAY) / 100;
        series2.push(avg_dep_delay);
        series3.push(avg_arr_delay);
      }
      var resObj = {
      "labels": dim1,
      "data1": series1,
      "data2": series2,
      "data3": series3
    };
    res.status(200).json(resObj);
    });
  });
};
