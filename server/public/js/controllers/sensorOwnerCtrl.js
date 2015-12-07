'use strict';
sensorCloud.controller("SensorOwnerCtrl", function($scope,$window,DataService,NgTableParams) {

  var sc = this;

  sc.getSensorData = function(){
    $scope.user_id = $window.sessionStorage.userId;
    $scope.user_name = $window.sessionStorage.userName;
    $scope.user_email = $window.sessionStorage.userEmail;
    

    
};
  

    
  

});