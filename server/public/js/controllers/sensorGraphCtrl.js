'use strict';
sensorCloud.controller("SensorGraphCtrl", function($scope,DataService,GraphService) {

  var sgc = this;

  sgc.getSensorData = function(){

    //Group By options
    sgc.GROUPS = GROUP_OPTIONS;
    sgc.group = sgc.GROUPS[0];
    sgc.groupBy = sgc.group.values[0];

    //Yaxis filter options
    sgc.YAXIS_OPTIONS = YAXIS_OPTIONS;
    sgc.yAxisFilter = YAXIS_OPTIONS[0];

    console.log("sgc.group");
    console.log(sgc.group);
    console.log("sgc.groupBy");
    console.log(sgc.groupBy);
    console.log("sgc.yAxisFilter");
    console.log(sgc.yAxisFilter);

    sgc.getSensorDataServer();

};

  sgc.getSensorDataServer = function(){
    var params = {
          group : sgc.group.group,
          value : sgc.groupBy
        };
    DataService.getData(URLs.SENSOR_DATA,params).success(function(response){
          sgc.serverGraphData = response.data;
          console.log(response);
          sgc.filterGraph(sgc.serverGraphData);
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