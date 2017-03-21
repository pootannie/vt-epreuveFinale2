const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

//acces au json
app.get('/', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		console.log( data );
		res.end(data);
	});
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Exemple l'application écoute sur http://%s", host, port)
})