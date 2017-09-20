// DEPENDENCIES *************************
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// EXPRESS DEFINITION *******************
var app = express();
var PORT = 3000; // UPDATE FOR HEROKU

// BODY PARSER SETUP ********************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

// ROUTES	*****************************************************

// ROOT ROUTE-------------------
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

// TABLES ROUTE---------------------
app.get("/tables", function (req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

// RESERVATIONS ROUTE-----------------
app.get("/reserve", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

// WAITLIST API ROUTE-----------------
app.get("/api/waitlist", function (req, res) {
	
	// QUERY FROM DB TO ARRAY OF OBJECTS (WHERE idnum >= 5)
	return res.json(characters);
});

// RESERVATIION API ROUTE-----------------
app.get("/api/tables", function (req, res) {
	
	// QUERY FROM DB TO ARRAY OF OBJECTS (WHERE 0 < idnum < 5)
	return res.json(characters);
});

app.post("/api/tables", function(req, res) {
	// SEND FORM DATA TO DB
});

// LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

