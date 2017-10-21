var MongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGODB_URI;
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function(err, db) {
  var myDB = db.db("flightdb");
  db.collection("flights", aggregateItems);
  setTimeout(function() {
    db.close();
  }, 3000);
});

function aggregateItems(err, flights) {
  flights.aggregate([{
        $group: {
          _id: {
            CARRIER: "$CARRIER"
          },
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
    ],
    function(err, results) {
      console.log(results);
    });
}