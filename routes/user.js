var user = require('express').Router();


module.exports = function(passport){

	user.post('/',function(req,res){

		console.log("in user");
		
		passport.authenticate('signup',function(err,user,info){
			if(err)
				res.status(500).json({data : err});
			else if(!user)
				res.status(403).json({data : "User already exist"});
			else
				res.status(200).json({data : user});
		})(req,res);
	});

	return user;

}