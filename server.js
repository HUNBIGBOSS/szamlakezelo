var express = require("express");
var login = require('./routes/loginroutes');
var bodypars = require('body-parser');

var liveApp = express();
liveApp.use(bodypars.urlencoded({ extended: true }));
liveApp.use(bodypars.json());

liveApp.use(function(datarequest, dataresults, next) {
	dataresults.header("Access-Control-Allow-Origin", "*");
	dataresults.header("Access-Control-Allow-Headers", "Origin, X-Requested.With, Content-Type, Accept");
	next();
});
var router = express.Router();

router.get('/', function(datarequest, dataresults) {
	dataresults.json({ message: 'Teszt'
});
});

router.post('/register',login.register);
router.post('/login',login.login);
liveApp.use('/api', router);
liveApp.listen(3000);
