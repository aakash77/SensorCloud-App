'use strict';
sensorCloud.controller("SensorTableCtrl", function($scope,DataService,NgTableParams,$window,$interval) {

    var stc = this;

    stc.initTable = function(){
        $scope.user_id = $window.sessionStorage.userId;
        stc.getSensorTableData();
        stc.tableInterval = $interval( function(){ stc.getSensorTableData(); }, DATA_INTERVAL);
    };


    stc.getSensorTableData = function(){
      var urlParam = "/"+$scope.user_id+"/sensor_data";
        DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
            console.log("received table data");
            stc.sensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
      });
    };

    $scope.$on('$destroy',function(){
      if(stc.tableInterval)
          $interval.cancel(stc.tableInterval);
      });

});