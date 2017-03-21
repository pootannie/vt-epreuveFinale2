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

//afficher le index.ejs
app.get('/',  (req, res) => {
	res.render("index.ejs");

})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("L'application écoute sur http://%s", host, port)
})

//etape 1
app.get('/fichier', function (req, res) {
	fs.readFile(__dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		res.end(data);
	});
})

//etape 2
app.get('/provinces', function (req, res) {
	fs.readFileSync(__dirname + "/public/text/" + "collection_provinces.json", "utf8")
	res.render("index.ejs")
})

//etape 3
app.get('/collection', function (req, res) {
	res.render("index.ejs")
})

//etape 4
app.get('/ajouterUn', function (req, res) {
	res.render("index.ejs")
})

//etape 5
app.get('/detruire', function (req, res) {
	res.render("index.ejs")
})

//etape 6
app.get('/ajouterPlusieurs', function (req, res) {
	res.render("index.ejs")
})