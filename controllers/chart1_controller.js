var db = require('../db');
exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
    $group: {
      _id: null,
      count: {
        $sum: 1
      }
    }
  }], function(err, results) {
    if (err) throw err;
    var doc = results[0];
    var total = doc.count;
    //console.log(total);
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
          _id: 1
        }
      }
    ]).toArray(function(err, results) {
      if (err) throw err;
      // console.log(results);
      var dim1 = [];
      var series1 = [];
      for (var index in results) {
        var doc = results[index];
        //category array
        var carrier = doc._id;
        //series 1 values array
        var percent = Math.round(10000 * doc.count / total) / 100;
        dim1.push(carrier);
        series1.push(percent);
      }
      var resObj = {
        "labels": dim1,
        "data": series1
      };
      res.status(200).json(resObj);
    });
  });
};
