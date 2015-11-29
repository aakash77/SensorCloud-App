'use strict';
sensorCloud.controller("WelcomeCtrl", function($scope,DataService,$location) {

	var ctrl = this;
	ctrl.email="",ctrl.name="",ctrl.password="";
	
	//Login Button Callback
	ctrl.loginBtn = function(){

		console.log("inside login button");

		if(!isFormValid("login"))
			alert("Invalid Form");
		else{
			var params = {
				email : ctrl.email,
				password : ctrl.password
			};
			DataService.postData(URLs.LOGIN,params).success(function(data){
				console.log(data);
				$location.path('/home');
			}).error(function(err){
				console.log(err);
			});
		}
	};

	//Signup Button Callback
	ctrl.signUpBtn = function(){
		console.log("inside signup button");

		if(!isFormValid("signup"))
			alert("Invalid Form");
		else{
			var params = {
				email : ctrl.email,
				password : ctrl.password,
				name : ctrl.name
			};
			DataService.postData(URLs.SIGNUP,params).success(function(data){
				console.log(data);
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