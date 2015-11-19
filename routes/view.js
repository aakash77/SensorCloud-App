var view = require('express').Router();


view.get('/',function(req,res){

	res.render('index');

});

module.exports = (function(){
	return view;
})();