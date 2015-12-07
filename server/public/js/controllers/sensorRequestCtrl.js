'use strict';
sensorCloud.controller("RequestCtrl", function($scope,$window,DataService,NgTableParams) {

  var rc = this;
  rc.getSensorData = function(){
    $scope.user_id = $window.sessionStorage.userId;
    $scope.user_name = $window.sessionStorage.userName;
    $scope.user_email = $window.sessionStorage.userEmail;
    
    rc.getSensorInfo();
    
};
  
  //Get sensor Info
  rc.getSensorInfo = function(){
      var urlParams = "/api/addrequest";
      DataService.getData(urlParams,{}).success(function(response){
          
          console.log("Request to add sensor");
          console.log(response.data);
          rc.sensorHealth = response.data;
          rc.sensorHealthData = new NgTableParams({ count: 7},{dataset: response.data});


          console.log(rc.sensorHealth);        
      });
  };

  rc.approveRequest = function(sensorreq){
    console.log("sensor");
    console.log(sensorreq);

    var urlParams = "/sensorRequest";
    DataService.postData(URLs.SENSOR_INFO+urlParams,{sensorreq}).success(function(response){
      }).error(function(err){
        console.log("Error while adding user Sensors Data");
      });

    var urlParams1 = "/requestStatusUpdate";
    DataService.putData(URLs.SENSOR_INFO+urlParams1,{sensorreq}).success(function(response){
      rc.updatedSensor = response.data;
      var i=0;
      while(sensorreq.sensorid != rc.sensorHealth[i].sensorid && i<rc.sensorHealth.length)
        i++;
      if(i<rc.sensorHealth.length)
        rc.sensorHealth.splice(i,1);
      rc.sensorHealth.push(rc.updatedSensor);
      
      rc.sensorHealthData = new NgTableParams({ count: 7},{dataset: rc.sensorHealth});
      }).error(function(err){
        console.log("Error while updating Request Status");
      });

     


  }
  

});