sensorCloud.service('GraphService', function() {

	this.transform_data = function(response,yAxis,callback){

        //no of sensors in the group
        var names = new Array();
        for(var i=0;i<response.length;i++)
        {
          names[i]=response[i].sensorid;
        }
       var numsensors = ($.unique(names)).length;
       var sensoridmap = ($.unique(names));
       //create empty array for distributing sensor data acc to sensor id
        var sensordataarray = [];
        for(var x=0;x<numsensors;x++)
        {
          var temparray1 = [];
          sensordataarray.push(temparray1);
        }
        //empty array created
        //divide sensor data into array created above
        for(var y=0;y<response.length;y++)
        {
          var temparray2 = [response[y].timestamp,response[y][yAxis]];
          var i = response[y].sensorid;
          var ind = sensoridmap.indexOf(i);
          sensordataarray[ind].push(temparray2);
        }
        
      //data inserted in array
      var graphdata=[];
      for(var j=0;j<numsensors;j++)
      {
        var datajson = {};
        datajson["key"] = "Sensor "+j;
        datajson["values"] = sensordataarray[j];
        graphdata.push(datajson);
      }
      var xAxisTickFormatFunction = function() {
            return function(d) {
              return d3.time.format('%H:%M')(new Date(d));
              //return d3.time.format("%y-%m-%d")(new Date(d));
            };
          };

        callback(graphdata,xAxisTickFormatFunction);

	};

});
//To get unique area values
sensorCloud.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});