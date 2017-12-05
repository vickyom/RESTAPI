var mongoose = require('mongoose');

var PersonSchema = mongoose.Schema({
	name: String,
	minutes: Number,
	amount: Number,
	mobileNo:Number,
	remarks:String,
	status:Boolean,
	PaidAmt:Number,
}, {
	timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);