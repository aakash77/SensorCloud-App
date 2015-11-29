'use strict';
var sensorCloud = angular.module("sensorCloud",['ngRoute','ui.bootstrap'])
.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl : 'partials/welcome',
		controller : 'WelcomeCtrl'
	}).when('/home',{
		templateUrl : 'partials/home'
	}).otherwise({
		redirectTo : '/'
	});
	
	
	/**
	 * to remove hash in the URL
	 */
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
	
});