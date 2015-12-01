var logout = require('express').Router();

module.exports = (function(){

	logout.post('/',function(req,res){

		console.log("in logout");
		req.logout();
		res.status(200).json({data:"Successfully logged out"});
	});
	return logout;
})();