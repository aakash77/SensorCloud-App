'use strict';
sensorCloud.controller("HomeCtrl", function($scope,DataService,GraphService) {

  var hm = this;

  hm.getSensorData = function(){

    //Group By options
    hm.GROUPS = GROUP_OPTIONS;
    hm.group = hm.GROUPS[0];
    hm.groupBy = hm.group.values[0];

    //Yaxis filter options
    hm.YAXIS_OPTIONS = YAXIS_OPTIONS;
    hm.yAxisFilter = YAXIS_OPTIONS[0];

    console.log("hm.group");
    console.log(hm.group);
    console.log("hm.groupBy");
    console.log(hm.groupBy);
    console.log("hm.yAxisFilter");
    console.log(hm.yAxisFilter);

    hm.getSensorDataServer();

};

  hm.getSensorDataServer = function(){
    var params = {
          group : hm.group.group,
          value : hm.groupBy
        };
    DataService.getData(URLs.SENSOR_DATA,params).success(function(response){
          hm.serverGraphData = response.data;
          console.log(response);
          hm.filterGraph(hm.serverGraphData);
      });
  };
	
  hm.filterGraph = function(input){
    var pre_data = input;
    if(!input){
      pre_data = hm.serverGraphData;
    }
    GraphService.transform_data(pre_data,hm.yAxisFilter.value,function(sensorData,tickFormatData){
      hm.sensorGraphData = sensorData;
      hm.xAxisTickFormatFunction = tickFormatData;
    });
  }; 


  hm.groupByChanged = function(){
    hm.groupBy = hm.group.values[0];
    hm.getSensorDataServer();
  };

});