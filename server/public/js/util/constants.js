/**
* variable for storing constants
*/

var URLs = {

	"LOGIN"	: "/login",
	"SIGNUP": "/user",
	"SENSOR_DATA":"/api/sensor_data"

};

var GROUP_OPTIONS = [
	{
		group:'area',
		values:['San Jose State University'],
		group_title : 'Area'
	},
	{
		group:'city',
		values:['San Jose'],
		group_title:'City'
	}];

var YAXIS_OPTIONS = [
	{
		'title':'Temperature',value:'temp'
	},
	{
		'title':'Humidity',value:'humidity'
	},
	{
		'title':'Pressure',value:'pressure'
	}
	];