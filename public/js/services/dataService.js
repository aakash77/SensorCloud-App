/**
 * New node file
 */
myFacebook.service('dataService',function($http){
	this.getData = function(URI,callback){
		return $http({
			method : 'GET',
			url : "/api/" + URI
		}).success(function(res){
			console.log("in getData success");
			callback(null,res);
		}).error(function(err){
			console.log("Error in GET " + "/api/" + URI);
			callback(err);
		});
	};
	
	this.postData = function(URI,details,callback){
		console.log("in postData line:18");
		return $http({
			method : 'POST',
			url : "/api/" +URI,
			data : details
		}).success(function(res){
			console.log("in postData line:24");
			callback(null,res);
		}).error(function(err){
			console.log("in data service error");
			/*console.log("Error in POST " + "/api/" + URI);*/
			callback(err);
		});
	};
});