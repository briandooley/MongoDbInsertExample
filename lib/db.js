var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function databaseRoute() {
  var database = new express.Router();
  database.use(cors());
  database.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  database.get('/', function(req, res) {
    console.log('get');
    console.log(req.body);

    var DB = null;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.FH_MONGODB_CONN_URL, function(err, db) {
      if (err) throw err;
      DB = db;
      console.log('connected');
      
     DB.collection('blah').remove({} , function(err, result) {
          if (err) throw err;
      });

      var insert_rec = {column_1 : 'first go'};
      DB.collection('blah').insert(insert_rec, function(err, docs) {
        if (err) throw err;
        console.log('insert complete for ' + JSON.stringify(insert_rec));
        console.log('docs are :- ' + JSON.stringify(docs));

        insert_rec = {column_1 : "second go"};
        DB.collection('blah').insert(insert_rec, function(err, docs) {
          if (err) throw err;
            console.log('insert complete for ' + JSON.stringify(insert_rec));
            console.log('docs are :- ' + JSON.stringify(docs));

            insert_rec = {_id : 'aaaaabbbbbcccccddddd1234', column_1 : 'third go'};
            DB.collection('blah').insert(insert_rec, function(err, docs) {
              if (err) throw err;
                console.log('insert complete for ' + JSON.stringify(insert_rec));
                console.log('docs are :- ' + JSON.stringify(docs));

                insert_rec = {_id : 'EEEEEFFFFFGGGGGHHHHH1234'};
                DB.collection('blah').insert(insert_rec, function(err, docs) {
                  if (err) throw err;
                    console.log('insert complete for ' + JSON.stringify(insert_rec));
                    console.log('docs are :- ' + JSON.stringify(docs));

                    DB.close();
              });
          });
        });
      });
    });
    
    res.json({msg: 'database '});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  database.post('/', function(req, res) {
    console.log(new Date(), 'In database route POST / req.body=', req.body);
    var world = req.body && req.body.database ? req.body.database : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'database ' + world});
  });

  return database;
}

module.exports = databaseRoute;
