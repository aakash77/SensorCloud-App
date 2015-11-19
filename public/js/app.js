/**
 * New node file
 */
'use strict';
var myFacebook = angular.module("myFacebook",['ngRoute','ui.bootstrap'])
.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl : 'addUser',
		controller : 'AddUserController'
	}).when('/api/logIn',{
		//templateUrl : 'templates/getUser',
		controller : 'GetUserController'
	}).when('/home',{
		templateUrl : 'home',
		controller : 'GetUserController'
	}).when('/invalid',{
		templateUrl : 'templates/invalid',
		controller : 'GetUserController'
	}).when('/logout',{
		templateUrl : 'logout',
		controller : 'GetUserController'
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