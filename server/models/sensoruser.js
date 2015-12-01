var mongoose = require('mongoose');

module.exports = mongoose.model('sensorusers',{
	sensor_id: String,
	user_id: String
});