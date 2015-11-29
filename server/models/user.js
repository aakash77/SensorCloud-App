var mongoose = require('mongoose');

module.exports = mongoose.model('users',{
	email: String,
	password: String,
	name: String
});