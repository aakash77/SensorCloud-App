var api = require('express').Router();
var sensordata = require('../models/sensordata');

module.exports = (function(){

	api.get('/sensor_data',function(req,res){
		var group = req.query.group;
		var value = req.query.value;
		var filter = {};
		filter[group] = value;
		sensordata.find(filter,null,{sort:{timestmp:1}},function(err,data){
			if(err)
				res.status(500).json({data:"error while fetching data"});
			res.status(200).json({data:data});
		});
	});
	return api;
})();