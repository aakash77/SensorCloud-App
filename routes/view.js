var view = require('express').Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

	view.get('/',function(req,res){

		res.render('index');

	});

	return view;
}