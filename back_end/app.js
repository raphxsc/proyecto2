var express = require('express');
var app = express();
var multer = require('multer');
const fs = require("fs");
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/user/add', function (req, res) {

  var data =req.body.usuario ;

  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.json({result:"ERROR"});
      return;
    }

    var dbo = db.db("base_entrevista");
    dbo.collection("usuarios").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      res.json({result:"OK"});
      db.close();
    });
  });

});

app.get('/user/list', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.json({result:"ERROR"});
      return;
    }
    var dbo = db.db("base_entrevista");
    dbo.collection("usuarios").find({}).toArray(function(err, result) {
     if (err)  res.json({result:"ERROR"});
     else{
       console.log(result);
       res.json({result:"OK",data:result});
     }
     db.close();
   });
  });
});


app.post('/user/delete', function (req, res) {

    let id  = req.body.id;

    MongoClient.connect(url, function(err, db) {
      if (err) {
        res.json({result:"ERROR"});
        return;
      }
      var dbo = db.db("base_entrevista");
      var usuario = { _id: id};
      dbo.collection("usuarios").deleteOne(usuario, function(err, obj) {
        if (err) res.json({result:"ERROR"});
        else res.json({result:"OK"});
        db.close();
      });
    });

});

app.post('/user/update', function (req, res) {

    let data  = req.body.usuario;
    let id = data.id;
    MongoClient.connect(url, function(err, db) {
      if (err) {
        res.json({result:"ERROR"});
        return;
      }
      var dbo = db.db("base_entrevista");
      var usuario = { _id: id};
      var updatedData = { $set: data };
      dbo.collection("usuarios").updateOne(usuario, updatedData, function(err, res) {
        if (err) throw err;
        else res.json({result:"OK"});
        db.close();
      });
    });
});

app.listen(3100, function () {
  console.log('Servidor listo');
});
