var db = require('../db');
exports.getData = function(req, res) {
  var flights = db.get().collection('flights');
  flights.aggregate([{
        $match: {
          CARRIER: {
            $eq: 'WN'
          }
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      }
    ],
    function(err, results) {
      if (err) throw err;
      var doc = results[0];
      var total = doc.count;
      //console.log(total);
      flights.aggregate([{
        $match: {
          CARRIER: {
            $eq: 'WN'
          }
        }
      },
      {
        $group: {
          _id: {
            CARRIER: "$CARRIER",
            ORIGIN: "$ORIGIN",
            DEST: "$DEST"
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id_CARRIER: "$_id.CARRIER", count: 1,
          rroute: {
            $cond: [{
              $lt: [{$cmp: ["$_id.ORIGIN", "$_id.DEST"]}, 0]},
              {$concat: ["$_id.ORIGIN", ' - ', "$_id.DEST"]},
              {$concat: ["$_id.DEST", ' - ', "$_id.ORIGIN"]}
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            _id_CARRIER: "$_id_CARRIER",
            rroute: "$rroute"
          },
          sum_count: {
            $sum: "$count"
          }
        }
      },
      {
        $sort: {
          sum_count: -1
        }
      },
      {
        $limit: 5
      }
    ]).toArray(function(err, results) {
        if (err) throw err;
        // console.log(results);
        var dim1 = [];
        var series1 = [];
        for (var index in results) {
          var doc = results[index];
          //category array
          var route = doc._id.rroute;
          //series 1 values array
          var percent = Math.round(10000 * doc.sum_count / total) / 100;
          dim1.push(route);
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
