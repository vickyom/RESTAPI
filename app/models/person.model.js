var mongoose = require('mongoose');

var PersonSchema = mongoose.Schema({
	name: String,
	minutes: Integer,
	amount: Double,
	mobileNo:Integer,
	remarks:String
}, {
	timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);