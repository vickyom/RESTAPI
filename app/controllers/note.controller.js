var Note = require('../models/note.model.js');
var redis = require('redis');
// var client = redis.createClient(); //creates a new client


// client.on('connect', function() {
//     console.log('redis connected');
// });
// client.set('framework', 'NODEJS');
exports.create = function (req, res) {
	console.log(req.body);
	// Create and Save a new Note
	if (!req.body.content) {
		res.status(400).send({
			message: "Note can not be empty"
		});
	}
	var note = new Note({
		title: req.body.title || "Untitled Note",
		content: req.body.content
	});

	note.save(function (err, data) {
		console.log(data);
		if (err) {
			console.log(err);
			res.status(500).send({
				message: "Some error occurred while creating the Note."
			});
		} else {
			res.send(data);
		}
	});
};

exports.findAll = function (req, res) {
	// Retrieve and return all notes from the database.
	Note.find(function (err, notes) {
		if (err) {
			res.status(500).send({
				message: "Some error occurred while retrieving notes."
			});
		} else {
			res.send(notes);
		}
	});
};

exports.findOne = function (req, res) {
	// Find a single note with a noteId
	Note.findById(req.params.noteId, function (err, data) {
		if (err) {
			res.status(500).send({
				message: "Could not retrieve note with id " + req.params.noteId
			});
		} else {
			res.send(data);
		}
	});
};

exports.update = function (req, res) {
	// Update a note identified by the noteId in the request
	Note.findById(req.params.noteId, function (err, note) {
		if (err) {
			res.status(500).send({
				message: "Could not find a note with id " + req.params.noteId
			});
		}
console.log(note);
		note.title = req.body.title;
		note.content = req.body.content;

		note.save(function (err, data) {
			if (err) {
				res.status(500).send({
					message: "Could not update note with id " + req.params.noteId
				});
			} else {
				res.send(data);
			}
		});
	});
};

exports.delete = function (req, res) {
	// Delete a note with the specified noteId in the request
	Note.remove({
		_id: req.params.noteId
	}, function (err, data) {
		if (err) {
			res.status(500).send({
				message: "Could not delete note with id " + req.params.id
			});
		} else {
			res.send({
				message: "Note deleted successfully!"
			})
		}
	});
};