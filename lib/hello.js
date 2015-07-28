var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  hello.get('/', function(req, res) {
    console.log('get');
    console.log(req.body);

    var DB = null;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.FH_MONGODB_CONN_URL, function(err, db) {
      if (err) throw err;
      DB = db;
      console.log('connected');
      
//      DB.collection('blah').remove({ });

      var insert_rec = {aaa_id : '123456'};
      DB.collection('blah').insert(insert_rec, function(err, docs) {
        if (err) throw err;
        console.log('insert complete');
      });

      insert_rec = {_id : 'sssss', testing : 'yyyyy'};
      DB.collection('blah').insert(insert_rec, function(err, docs) {
        if (err) throw err;
        console.log('insert complete');
      });

      insert_rec = {ShouldWork : "This should appear in the data browser"};
      DB.collection('blah').insert(insert_rec, function(err, docs) {
        if (err) throw err;
        console.log('insert complete');
      });

      DB.close();
    })

    res.json({msg: 'Hello '});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return hello;
}

module.exports = helloRoute;
