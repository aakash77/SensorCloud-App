var login = require('express').Router();


module.exports = function(passport){

	login.post('/',function(req,res){

		console.log("in login");

		passport.authenticate('login',function(err,user,info){

			if(err)
				res.status(500).json({data : err});
			else if(!user)
				res.status(403).json({data : "Invalid Credentials"});
			else
				res.status(200).json({data : user});
		})(req,res);

	});

	return login;

}