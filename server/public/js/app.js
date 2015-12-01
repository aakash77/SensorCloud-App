'use strict';
var sensorCloud = angular.module("sensorCloud",['ngRoute','ui.bootstrap','nvd3ChartDirectives','ngAnimate','ngTable'])
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


	
}).run(['$rootScope','$window','$location','$templateCache',function($rootScope,$window, $location,$templateCache) {
	
	$rootScope.$on('$routeChangeStart', function(event,next, current) {
		
		if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
		
		if($window.sessionStorage.userId)
			$location.path('/home');
		else
			$location.path('/');
	});
}]);