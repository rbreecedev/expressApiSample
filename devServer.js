var express = require('express')
var app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
const dbName = 'dev-challenge';
const client = new MongoClient(url);
client.connect((err) => {
    if(err) throw err;
    console.log("Connected correctly to server");
    let db = client.db(dbName);
    let titlesCollection = db.collection('Titles');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.get('/title/:name', function (req, res) {
        titlesCollection.find({TitleName: {'$regex': req.params.name, '$options' : 'i'}}).project({TitleName: 1}).toArray((err, result) => {
            if (err) {
                res.status(500).send('Something went wrong! Maybe a ' + err.name);
            }
            res.send(result);
        });
    });

    app.get('/details/:id', function (req, res) {
        titlesCollection.find({_id: req.params.id}).toArray((err, result) => {
            if (err) {
                res.status(500).send('Something went wrong! Maybe a ' + err.name);
            }
            res.send(result);
        });
    });

    app.set('port', 8989);
    app.listen(app.get('port'), function() {
        console.log('Node App Started');
    });
})
