var mongoose = require('mongoose');

module.exports = mongoose.model('sensordatas',{
	sensorid: String,
	lat: String,
    lng: String,
    city: String,
    area: String,
    timestamp: Number,
    temp: Number,
    pressure: Number,
    humidity: Number
});