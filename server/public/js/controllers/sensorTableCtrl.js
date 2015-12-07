'use strict';
sensorCloud.controller("SensorTableCtrl", function($scope,DataService,NgTableParams,$window,$interval) {

    var stc = this;

    stc.initTable = function(){
        $scope.user_id = $window.sessionStorage.userId;
        stc.getSensorTableData();
        stc.tableInterval = $interval( function(){ stc.getSensorTableData(); }, DATA_INTERVAL);
    };


    stc.getSensorTableData = function(){
      var urlParam = "/"+$scope.user_id+"/sensor_data/"+Date.parse($scope.dt1)+"/"+Date.parse($scope.dt2);
        DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
            console.log("received table data");
            stc.sensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
      });
    };

    $scope.$on('$destroy',function(){
      if(stc.tableInterval)
          $interval.cancel(stc.tableInterval);
      });

      $scope.today = function() {
    $scope.dt2 = new Date();
    $scope.dt1 = new Date();
    $scope.dt1.setDate($scope.dt1.getDate()-1);
  };
  $scope.today();


  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function($event) {
    $scope.status1.opened = true;
  };

  $scope.open2 = function($event) {
    $scope.status2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt1 = new Date(year, month, day);
    $scope.dt2 = new Date(year, month, day);

  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status1 = {
    opened: false
  };

  $scope.status2 = {
    opened: false
  };


});