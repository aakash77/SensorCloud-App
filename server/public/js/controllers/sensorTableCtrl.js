'use strict';
sensorCloud.controller("SensorTableCtrl", function($scope,DataService,NgTableParams,$window) {

    var stc = this;

    stc.initTable = function(){
        $scope.user_id = $window.sessionStorage.userId;
        stc.getSensorTableData();      

    };


    stc.getSensorTableData = function(){
      var urlParam = "/"+$scope.user_id+"/sensor_data";
        DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
        stc.sensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
      });
    };

    

});