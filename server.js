var express = require('express');
var bodyParser = require('body-parser');
var app = express();


// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
	console.log('Could not connect to the database. Exiting now...');
	process.exit();
});
mongoose.connection.once('open', function() {
	console.log("Successfully connected to the database");
})
// create express app


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/note.routes.js')(app);
// define a simple route
app.get('/', function (req, res) {
	res.json({
		"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
	});
});

// listen for requests
app.listen(3000, function () {
	console.log("Server is listening on port 3000");
});