module.exports = function(app) {
	var persons = require('../controllers/person.controller.js');

	
	// Person Start

	app.post('/person', persons.create);

	app.get('/person', persons.findAll);

	app.get('/person/:mobileNo', persons.findOne);	

	app.put('/person/:mobileNo', persons.update);
	// Persons End 
};
