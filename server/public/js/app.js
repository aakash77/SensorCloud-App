'use strict';
var sensorCloud = angular.module("sensorCloud",['ngRoute','ui.bootstrap','nvd3ChartDirectives','ngAnimate'])
.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl : 'partials/welcome',
		controller : 'WelcomeCtrl'
	}).when('/home',{
		templateUrl : 'partials/home',
		controller : 'HomeCtrl'
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
