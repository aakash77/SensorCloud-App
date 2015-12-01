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

	view.get('/partials/:page',function(req,res){
		res.render('partials/'+req.params.page);
	});

	view.get('/home',function(req,res){
		res.render('index');
	});

	return view;
}