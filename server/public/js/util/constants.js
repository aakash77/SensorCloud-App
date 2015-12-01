/**
* variable for storing constants
*/

var URLs = {

	"LOGIN"	: "/login",
	"SIGNUP": "/user",
	"SENSOR_DATA":"/api/sensor_data",
	"LOGOUT": "/logout"

};

var GROUP_OPTIONS = [
	{
		group:'area',
		values:['San Jose State University','Stanford University','San Jose City College','Santa Clara University'],
		group_title : 'Area'
	},
	{
		group:'city',
		values:['San Jose','Stanford','Santa Clara'],
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