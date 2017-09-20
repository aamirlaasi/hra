// DEPENDENCIES *************************
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var responseArray = [];

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

// MYSQL SERVER CONNECTION **************
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "meternx01",
	database: "databaseHRA"
});

// DATABASE CONNECTION ********************
connection.connect(function (err) {
	if (err) throw err;
	// if connected correctly
	console.log("connected as thread id " + connection.threadId + "\n");
});

// ROUTES	*****************************************************

// ROOT/INDEX ROUTE-------------------
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
	connection.query("SELECT * FROM tableTBL LIMIT 5", function (err, res) {
		if (err) throw err; // if error - break and show error

		for (i = 0; i < res.length; i++) {
			responseArray.push(res[i]);
			console.log("--------------------------");
		}
		console.log(responseArray);
		console.log("--------------------------");
		return responseArray;
	});
	console.log(responseArray);
	//return res.json(responseArray);
});

app.post("/api/tables", function (req, res) {
	// SEND FORM DATA TO DB
	var reqTable = req.body;
	
	var query = connection.query('INSERT INTO tableTBL(tbl_id,cust_name,cust_phone,cust_email) VALUES (' + reqTable.id + ',"' + 
					 reqTable.name + '","' + reqTable.phone + '","' + reqTable.email + '")');
	
	console.log(query.sql);
	
//	connection.query("INSERT INTO tableTBL SET ?", {
//			cust_name: reqTable.name,
//			cust_phone: reqTable.phone,
//			cust_email: reqTable.email,
//			tbl_id: reqTable.id
//		},
//		function (err, res) {
//			console.log(res.affectedRows + " product inserted!\n");
//		}
//	});
});

// LISTENER
app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
