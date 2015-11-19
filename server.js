var express = require('express'),
	view = require('./routes/view');

var server = express();


server.set('views',__dirname+'/views');
server.engine('html',require('ejs').renderFile);
server.set('view engine','html');
server.use(express.static(__dirname+'/public'));


server.use(function(req,res,next){

	console.log(req.url);
	next();

});

server.use('/',view);


//catch 404 and forward to error handler
server.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


//error handlers

//development error handler
//will print stacktrace
if (server.get('env') === 'development') {
	server.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error');
	});
}

//production error handler
//no stacktraces leaked to user
server.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error');
});


module.exports = (function(){
	return server;
})();