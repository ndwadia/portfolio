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
    var count = doc.count;

    dim1.push({
      "label": carrier
    });
    series1.push({
      "value": count
    });
  }

  var dataset = [{
      "seriesname": "Flight Count",
      "data": series1
    }
  ];
  var resObj = {
    "dataset": dataset,
    "categories": dim1
  };
  res.status(200).json(resObj);
});
};