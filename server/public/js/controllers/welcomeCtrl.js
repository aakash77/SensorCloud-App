'use strict';
sensorCloud.controller("WelcomeCtrl", function($scope,DataService,$location,$window) {

	var ctrl = this;
	ctrl.email="",ctrl.name="",ctrl.password="";
	
	//Login Button Callback
	ctrl.loginBtn = function(){

		if(!isFormValid("login"))
			alert("Invalid Form");
		else{
			var params = {
				email : ctrl.email,
				password : ctrl.password
			};
			DataService.postData(URLs.LOGIN,params).success(function(response){
				$window.sessionStorage.userId = response.data._id;
				$window.sessionStorage.userEmail = response.data.email;
				$location.path("/home");
			}).error(function(err){
				console.log(err);
			});
		}
	};

	//Signup Button Callback
	ctrl.signUpBtn = function(){

		if(!isFormValid("signup"))
			alert("Invalid Form");
		else{
			var params = {
				email : ctrl.email,
				password : ctrl.password,
				name : ctrl.name
			};
			DataService.postData(URLs.SIGNUP,params).success(function(response){
				$window.sessionStorage.userId = response.data._id;
				$window.sessionStorage.userId = response.data.email;
				$location.path("/home");
			}).error(function(err){
				console.log(err);
			});
		}
	};
	//Check form validation
	function isFormValid(formName){

		if(formName==="login"){
			if(ctrl.email==="" || ctrl.password==="")
				return false;
		}
		else if(ctrl.email==="" || ctrl.password==="" || ctrl.name==="")
			return false;

		return true;
	}
	
});