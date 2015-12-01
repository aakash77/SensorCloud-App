'use strict';
sensorCloud.controller("HomeCtrl", function($scope,DataService,$window,$location) {

  var hm = this;

  hm.changeTemplate = function(template){
      hm.templateView = template;
  };

  hm.logoutBtn = function(){
  		var params = {
  			id : $window.sessionStorage.userId,
  			email : $window.sessionStorage.userEmail
  		};
  		DataService.postData(URLs.LOGOUT,params).success(function(response){
  			delete $window.sessionStorage.userId;
  			delete $window.sessionStorage.userEmail;	
  			$location.path('/');
  		}).error(function(err){
  			console.log("error while logging out");
  		});
  };

});