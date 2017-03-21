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
	res.render("index_defaut.ejs");

})

var server = app.listen(8081, function () {
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
	var data = fs.readFileSync(__dirname + "/public/text/" + "collection_provinces.json", "utf8")
	res.render('index.ejs', {provinces : JSON.parse(data)});
})

//etape 3
/*MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})*/

app.get('/collection', function (req, res) {
	res.render("index.ejs")
})

//etape 4
app.get('/ajouterUn', function (req, res) {
	res.render("index.ejs")
})

//etape 5
app.get('/detruire', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		//data = JSON.parse(data);
		//delete data["user" + req.params.id];
		//res.end( JSON.stringify(data));
		db.collection.remove(data)
	});

	res.render("index.ejs")
})

//etape 6
app.get('/ajouterPlusieurs', function (req, res) {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		db.collection.insertMany(data);
		res.end(JSON.stringify(data));
	});
	res.render("index.ejs", {provinces : JSON.parse(data)})
})