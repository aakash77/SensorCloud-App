var mongoose = require('mongoose');

module.exports = mongoose.model('sensordatas',{
	lat: String,
    lng: String,
    city: String,
    area: String,
    timestmp: Number,
    temp: Number,
    pressure: Number,
    humidity: Number
});