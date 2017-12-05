var Person = require('../models/person.model.js');
var redis = require('redis');

var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('redis connected');
});

exports.create = function(req, res) {
    console.log('  - - - - - -- - Persons Create 333333- - - - - - - ');
    console.log(req.body);
    // Create and Save a new Person
    if (!req.body) {
        return res.status(400).send({
            message: 'Person can not be empty',
        });
    }
    var person = new Person({
        name: req.body.name,
        minutes: req.body.minutes,
        amount: req.body.amount,
        mobileNo: req.body.mobileNo,
        remarks: req.body.remarks,
        status: req.body.status,
        PaidAmt: req.body.PaidAmt,
    });

    person.save(function(err, data) {
        console.log('Data save in DB');
        console.log(data);
        if (err) {
            return res.status(500).send({
                message: 'Some error occurred while creating the Note.',
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Person.find(function(err, notes) {
        if (err) {
            return res.status(500).send({
                message: 'Some error occurred while retrieving notes.',
            });
        } else {
            res.send(notes);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single person with a mobileNo
    // console.log(req.params);
    client.get(req.params.mobileNo, function(err, data) {
        if (err) {
			res.status(500).send({
				message:
					'Could not retrieve note with id ' +
					req.params.mobileNo,
			});
        } else if (data) {
            // console.log('read from redies');
            // console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        } else {
            Person.find({ mobileNo: req.params.mobileNo }, function(err, data) {
                client.set(req.params.mobileNo, JSON.stringify(data));
                if (err) {
                    res.status(500).send({
                        message:
                            'Could not retrieve note with id ' +
                            req.params.mobileNo,
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
};

exports.updateAll = function(req, res) {
    // Update a person identified by the mobileNo in the request
    console.log(req.params.mobileNo);
    Person.update(
        { mobileNo: req.params.mobileNo },
        { $set: { name: req.body.name } },
        { multi: true },
        function(err, num) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(num);
            }
        }
    );
};

exports.delete = function(req, res) {
    Person.remove(
        {
            _id: req.params.peronId,
        },
        function(err, data) {
            if (err) {
                res.status(500).send({
                    message: 'Could not delete note with id ' + req.params.id,
                });
            } else {
                res.send({
                    message: 'Note deleted successfully!',
                });
            }
        }
    );
};
