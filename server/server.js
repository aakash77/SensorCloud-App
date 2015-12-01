var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	expressSession = require('express-session'),
	flash = require('connect-flash'),
	initPassport = require('./passport/init');

var dbConfig = require('./config/db');

mongoose.connect(dbConfig.url);
var server = express();


server.set('views',__dirname+'/views');
server.engine('html',require('ejs').renderFile);
server.set('view engine','html');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));
server.use(cookieParser());
server.use(express.static(__dirname+'/public'));
server.use(flash());

//Passport
server.use(expressSession({saveUninitialized: true,resave:false,
		secret: 'mySecretKey'
	}));
server.use(passport.initialize());
server.use(passport.session());
initPassport(passport);

var view = require('./routes/view')(passport),
	login = require('./routes/login')(passport),
	user = require('./routes/user')(passport),
	api = require('./routes/api'),
	logout = require('./routes/logout');

//Middleware before any request
server.use(function(req,res,next){
	console.log(req.url);
	next();
});

//Request Mapping
server.use('/login',login);
server.use('/logout',logout);
server.use('/user',user);
server.use('/api',api);
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