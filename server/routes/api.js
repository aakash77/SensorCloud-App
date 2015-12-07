var api = require('express').Router();
var sensordata = require('../models/sensordata'),
	sensoruser = require('../models/sensoruser'),
	infosensors = require('../models/infosensors'),
	sensorrequest = require('../models/sensorrequest');

module.exports = (function(){

	//Get all sensor data
	api.get('/sensor_data',function(req,res){
		var group = req.query.group;
		var value = req.query.value;
		var filter = {};
		if(group && value)
			filter[group] = value;
		sensordata.find(filter,null,{sort:{timestamp:1}},function(err,data){
			if(err)
				res.status(500).json({data:"error while fetching data"});
			res.status(200).json({data:data});
		});
	});

	//Get sensor by user
	api.get('/user/:id/sensor_data',function(req,res){
		var id = req.params.id;
		
		sensoruser.find({'user_id':id},'sensor_id -_id',{sort:{timestamp:1}},function(err,sensorIds){
			var sensors = sensorIds.map(function(sensor){
				return sensor.sensor_id;
			});
			var group = req.query.group;
			var value = req.query.value;
			var filter = {};
			if(group && value)
				filter[group] = value;
			
			sensordata.find().where(filter).where('sensorid').in(sensors).exec(function(err,data){
				if(err)
					res.status(500).json({data:"error while fetching data"});
				else
					res.status(200).json({data:data});
			});
		});
	});

	//Get sensor by user TIMEBOUND
	api.get('/user/:id/sensor_data/:fromdate/:todate',function(req,res){
		var id = req.params.id;
		var fromdate = req.params.fromdate;
		var todate = req.params.todate;
		
		sensoruser.find({'user_id':id},'sensor_id -_id',{sort:{timestamp:1}},function(err,sensorIds){
			var sensors = sensorIds.map(function(sensor){
				return sensor.sensor_id;
			});
			var group = req.query.group;
			var value = req.query.value;
			var filter = {"timestamp": {"$gte": fromdate, "$lt": todate}};
			if(group && value)
				filter[group] = value;
			
			sensordata.find().where(filter).where('sensorid').in(sensors).exec(function(err,data){
				if(err)
					res.status(500).json({data:"error while fetching data"});
				else
					res.status(200).json({data:data});
			});
		});
	});

	//Add User Sensor Entry
	api.post('/user/:id/sensor/:sensorId',function(req,res){

		var obj = {
			user_id : req.params.id,
			sensor_id : req.params.sensorId
		};
		
		var newUserSensorEntry = new sensoruser(obj);
		newUserSensorEntry.save(function(err,newEntry){
			if(err)
				res.status(500).json({data:err});
			else
				res.status(200).json({data:newEntry});
		});
	});

	//Remove User Sensor Entry
	api.delete('/user/:id/sensor/:sensorId',function(req,res){
		var obj = {
			user_id : req.params.id,
			sensor_id : req.params.sensorId
		};
		
		sensoruser.remove(obj,function(err,removed){
			if(err)
				res.status(500).json({data:"error while removing data"});
			else
				res.status(200).json({data:removed});
		});
	});

	//Add new sensor
	api.post('/sensor',function(req,res){
		var params = {
			sensorid : req.body.sensorid,
			area : req.body.area,
			city : req.body.city
		};
		console.log(params);
		var newSensorEntry = new infosensors(params);
		newSensorEntry.save(function(err,newEntry){
			if(err)
				res.status(500).json({data:err});
			else
				res.status(200).json({data:newEntry});
		});
	});

	//Approve new sensor request(insert into sensorinfo collection)
	api.post('/sensor/sensorRequest',function(req,res){
		var params = {
			sensorid : req.body.sensorreq.sensorid,
			area : req.body.sensorreq.area,
			city : req.body.sensorreq.city,
			sensor_type: req.body.sensorreq.sensor_type,
			sensor_owner_name: req.body.sensorreq.sensor_owner_name,
			sensor_owner_id: req.body.sensorreq.sensor_owner_id,
			health: req.body.sensorreq.health
		};
		console.log(params);
		var newSensorEntry = new infosensors(params);
		newSensorEntry.save(function(err,newEntry){
			if(err)
				res.status(500).json({data:err});
			else
				res.status(200).json({data:newEntry});
		});
	});

	//Update status of Request for adding Sensors
	api.put('/sensor/RequeststatusUpdate',function(req,res){
		console.log("Request status Update");
		var id = req.body.sensorreq.sensorid;
		sensorrequest.findOne({'sensorid':id}, function (err, addreq) {
			addreq.request_status = "Approved";
		    return addreq.save(function (err) {
		      if (!err) {
		        res.status(200).json({data:addreq});
		    	console.log("updated");}
		      else
		        res.status(500).json({data:"error while removing data"});
		      

		    });
		  });



	});

	//Get Sensor City Area details
	api.get('/sensor/health',function(req,res){
		var id = req.params.id;

		infosensors.find({},function(err,data){
			if(err)
				res.status(500).json({data:"error while removing data"});
			else
				res.status(200).json({data:data});
		});
	});

		//Get Sensor health details
	api.get('/sensor/:id',function(req,res){

		var id = req.params.id;

		infosensors.findOne({'sensorid':id},function(err,data){
			if(err)
				res.status(500).json({data:"error while removing data"});
			else
				res.status(200).json({data:data});
		});
	});

			//Get Sensor Requests
	api.get('/addrequest',function(req,res){
		console.log("inside add reqests");
		sensorrequest.find({},function(err,data){
			if(err)
				res.status(500).json({data:"error while removing data"});	
			else
				res.status(200).json({data:data});
		});
	});





	//Get user sensors info
	api.get('/user/:id/sensors',function(req,res){
		var id = req.params.id;
		sensoruser.find({'user_id':id},'sensor_id -_id',function(err,sensorIds){
			var sensors = sensorIds.map(function(sensor){
				return sensor.sensor_id;
			});

			infosensors.find().where('sensorid').in(sensors).exec(function(err,data){
				if(err)
					res.status(500).json({data:"error while removing data"});
				else
					res.status(200).json({data:data});	
			});
		});
	});

	//Get all sensors available
	api.get('/sensor',function(req,res){
		infosensors.find({},function(err,data){
				if(err)
					res.status(500).json({data:"error while removing data"});
				else
					res.status(200).json({data:data});	
			});
	});	

	//Get sensor data from a sensor
	api.get('/sensor_data/:id',function(req,res){
		var id = req.params.id;
		sensordata.find({'sensorid':id},{sort:{timestamp:1}},function(err,sensorData){
			if(err)
				res.status(500).json({data:"error while removing data"});
			else
				res.status(200).json({data:sensorData});	
		});
	});


	//Get sensors available for user to enroll
	api.get('/user/:id/sensors_available',function(req,res){
		var id = req.params.id;
		sensoruser.find({'user_id':id},'sensor_id -_id',function(err,sensorIds){
			var sensors = sensorIds.map(function(sensor){
				return sensor.sensor_id;
			});
			console.log(sensors);
			infosensors.find().where('sensorid').nin(sensors).exec(function(err,data){
				if(err)
					res.status(500).json({data:"error while removing data"});
				else
					res.status(200).json({data:data});	
			});
		});
	});

	return api;
})();