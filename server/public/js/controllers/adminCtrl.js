'use strict';
sensorCloud.controller("AdminCtrl", function($scope,$window,DataService,NgTableParams) {

  var ac = this;

  ac.getSensorData = function(){
    $scope.user_id = $window.sessionStorage.userId;
    $scope.user_name = $window.sessionStorage.userName;
    $scope.user_email = $window.sessionStorage.userEmail;
    
    ac.getSensorInfo();
    
};
  
  //Get sensor Info
  ac.getSensorInfo = function(){

      DataService.getData(URLs.SENSOR_INFO+"/health",{}).success(function(response){
          
          /*console.log("Health info of all sensors");
          console.log(response.data);*/
          ac.sensorHealth = response.data;
          ac.sensorHealth = new NgTableParams({ count: 7},{dataset: response.data});


          console.log(ac.sensorHealth);        
      });
  };
  

});