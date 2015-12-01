'use strict';
sensorCloud.controller("DashboardCtrl", function($scope,$window,DataService,NgTableParams) {

    var dc = this;
    dc.initDashboard = function(){
      $scope.user_id = $window.sessionStorage.userId;
      dc.getAllAvailableSensors();
      dc.getUserSensors();
    };

    //Get All Sensors
    dc.getAllAvailableSensors = function(){
      var urlParams = "/"+$scope.user_id+"/sensors_available";
      DataService.getData(URLs.USER_DATA+urlParams,{}).success(function(response){
          console.log(response.data);
          dc.availableSensorsData = response.data; 
          dc.availableSensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
      }).error(function(err){
        console.log("Error while fetching all available Sensors Data");
      });
    };

    //Get User Sensors
    dc.getUserSensors = function(){
      var urlParams = "/"+$scope.user_id+"/sensors";
      DataService.getData(URLs.USER_DATA+urlParams,{}).success(function(response){
          console.log(response.data);
          dc.userSensorsData = response.data; 
          dc.userSensorTableData = new NgTableParams({ count: 7},{dataset: response.data});
      }).error(function(err){
        console.log("Error while fetching user Sensors Data");
      });
    };

    //Add Sensor Button Callback
    dc.addSensorBtn = function(sensor){
      dc.userSensorsData.push(sensor);
      var i=0;
      while(sensor.sensorid != dc.availableSensorsData[i].sensorid && i<dc.availableSensorsData.length)
        i++;
      if(i<dc.availableSensorsData.length)
        dc.availableSensorsData.splice(i,1);
      
      updateTables(dc.availableSensorsData,dc.userSensorsData);
      //Update DB
      var urlParams = "/"+$scope.user_id+"/sensor/"+sensor.sensorid;
      DataService.postData(URLs.USER_DATA+urlParams,{}).success(function(response){
          console.log(response.data);
      }).error(function(err){
        console.log("Error while adding user Sensors Data");
      });
    };

    //Remove Sensor Button Callback
    dc.removeSensorBtn = function(sensor){

      dc.availableSensorsData.push(sensor);
      var i=0;
      while(sensor.sensorid != dc.userSensorsData[i].sensorid && i<dc.userSensorsData.length)
        i++;
      if(i<dc.userSensorsData.length)
        dc.userSensorsData.splice(i,1);
      
      updateTables(dc.availableSensorsData,dc.userSensorsData);
      //Update DB
      var urlParams = "/"+$scope.user_id+"/sensor/"+sensor.sensorid;
      DataService.deleteData(URLs.USER_DATA+urlParams,{}).success(function(response){
          console.log(response.data);
      }).error(function(err){
        console.log("Error while deleting user Sensors Data");
      });

    };

    function updateTables(availableTable,userTable){

      dc.availableSensorTableData = new NgTableParams({ count: 7},{dataset: availableTable});
      dc.userSensorTableData = new NgTableParams({ count: 7},{dataset: userTable}); 
    };


  });