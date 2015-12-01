'use strict';
sensorCloud.controller("BillingCtrl", function($scope,$window,DataService) {

  var bc = this;

  bc.getSensorData = function(){
    $scope.user_id = $window.sessionStorage.userId;
    $scope.user_name = $window.sessionStorage.userName;
    $scope.user_email = $window.sessionStorage.userEmail;
    
    bc.getUserSensorInfo();
    
    //Get Price per sensor for cities
    $scope.priceCity = PRICE_CITIES;
    console.log("price for cities");
    console.log($scope.priceCity);
    
};
  
  //Get sensor Info
  bc.getUserSensorInfo = function(){

      var urlParam = "/"+$scope.user_id+"/sensors";
      DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
          
          console.log("Sensors selected by the user");
          console.log(response.data);
          bc.userSensors = response.data;

          bc.userSensors = bc.groupByLoc(bc.userSensors,"city");
          console.log(bc.userSensors);
          $scope.total = 0;
          angular.forEach(bc.userSensors, function(key , value) {
            
           $scope.total += $scope.priceCity[value] * key; 
         });
          

          
      });
  };
  
  bc.groupByLoc = function(myjson,attr){
    var group ={};

    myjson.forEach( function(obj){
       if ( typeof group[obj[attr]] == 'undefined') {
         group[obj[attr]] = 1;
       }
       else {
         group[obj[attr]]++;
       } 
    });
    return group;
}

sensorCloud.filter('sumFilter', function() {
     return function(groups) {
         var taxTotals = 0;
         for (i=0; i<groups.length; i++) {
             taxTotal = taxTotal + groups[i].taxes;    
          };
         return taxTotals;
     };
 });

});