var mongoose = require('mongoose');

module.exports = mongoose.model('infosensors',{
	sensorid: String,
	city: String,
    area: String
});