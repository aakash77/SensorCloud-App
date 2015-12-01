'use strict';
sensorCloud.controller("SensorGraphCtrl", function($scope,$window,DataService,GraphService,$interval) {

  var sgc = this;
  
  sgc.getSensorData = function(){
    $scope.user_id = $window.sessionStorage.userId;
    //Group By options and sensor data
    sgc.getUserSensorInfo();
    //Yaxis filter options
    sgc.YAXIS_OPTIONS = YAXIS_OPTIONS;
    sgc.yAxisFilter = YAXIS_OPTIONS[0];
};
  //Get sensor data
  sgc.getSensorDataServer = function(){
    console.log("get graph data from server");
    var params = {
          group : sgc.group.group,
          value : sgc.groupBy
        };
    var urlParam = "/"+$scope.user_id+"/sensor_data";
    DataService.getData(URLs.USER_DATA+urlParam,params).success(function(response){
          sgc.serverGraphData = response.data;
          sgc.filterGraph(sgc.serverGraphData);
      });
  };
  //Get sensor Info
  sgc.getUserSensorInfo = function(){

      var urlParam = "/"+$scope.user_id+"/sensors";
      DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
          
          var areas = response.data.map(function(sensor){
            return sensor.area;
          });
          var cities = response.data.map(function(sensor){
            return sensor.city;
          });

          sgc.GROUPS=[
                  {
                    group:'area',
                    values:areas,
                    group_title : 'Area'
                  },
                  {
                    group:'city',
                    values:cities,
                    group_title:'City'
                  }];
          
          sgc.group = sgc.GROUPS[0];
          sgc.groupBy = sgc.group.values[0];
          sgc.getSensorDataServer();
          $interval( function(){ sgc.getSensorDataServer(); }, DATA_INTERVAL);
      });
  };
	
  sgc.filterGraph = function(input){
    var pre_data = input;
    if(!input){
      pre_data = sgc.serverGraphData;
    }
    GraphService.transform_data(pre_data,sgc.yAxisFilter.value,function(sensorData,tickFormatData){
      sgc.sensorGraphData = sensorData;
      sgc.xAxisTickFormatFunction = tickFormatData;
    });
  }; 


  sgc.groupByChanged = function(){
    sgc.groupBy = sgc.group.values[0];
    sgc.getSensorDataServer();
  };

});