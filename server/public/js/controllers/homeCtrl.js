'use strict';
sensorCloud.controller("HomeCtrl", function($scope,DataService,GraphService) {

  var hm = this;

  hm.getSensorData = function(){
    hm.group = 'area';
    hm.groupBy = 'SJSU';
    hm.yAxisFilter = 'temp';
      console.log("GETTING SENSOR DATA");
      var params = {
        group : hm.group,
        value : hm.groupBy
      };
      DataService.getData(URLs.SENSOR_DATA,params).success(function(response){
        console.log("I got the data I requested");
        console.log(response);
        hm.filterGraph(response.data);
    });
};
	
hm.filterGraph = function(input){
  var pre_data = input;
  if(!input){
    pre_data = hm.sensorGraphData;
  }
  GraphService.transform_data(pre_data,hm.yAxisFilter,function(sensorData,tickFormatData){
    hm.sensorGraphData = sensorData;
    hm.xAxisTickFormatFunction = tickFormatData;
  });
};

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
});