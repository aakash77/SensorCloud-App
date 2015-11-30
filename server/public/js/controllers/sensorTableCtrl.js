'use strict';
sensorCloud.controller("SensorTableCtrl", function($scope,DataService,NgTableParams) {

    var stc = this;

    stc.initTable = function(){

        stc.getSensorTableData();      

    };


    stc.getSensorTableData = function(){
      DataService.getData(URLs.SENSOR_DATA,{}).success(function(response){
        stc.sensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
        console.log(response);
      });
    };

    

});