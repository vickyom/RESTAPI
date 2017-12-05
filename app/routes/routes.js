module.exports = function(app) {
	var notes = require('../controllers/note.controller.js');
	var persons = require('../controllers/person.controller.js');

	// Notes Start 

	// Create a new Note
	app.post('/notes', notes.create);

	// Retrieve all Notes
	app.get('/notes', notes.findAll);

	// Retrieve a single Note with noteId
	app.get('/notes/:noteId', notes.findOne);
	
	// Update a Note with noteId
	app.put('/notes/:noteId', notes.update);

	// Delete a Note with noteId
	app.delete('/notes/:noteId', notes.delete);

	// Notes End 

	// Person Start

	app.post('/person', persons.create);

	app.get('/person', persons.findAll);

	app.get('/person/:mobileNo', persons.findOne);	

	app.put('/person/:mobileNo', persons.updateAll);

	app.delete('/person/:peronId', persons.delete);
	// Persons End 
};
