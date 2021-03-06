var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
var index = require('./index')
var path = __dirname + '/pages/';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});
var router = express.Router();
// test route
router.get('/', function(req, res) {
      res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
router.get('/', function (req, res) {
	res.sendFile(path + "index.html");
});
app.listen(5000, function() {
	console.log("A szerver működik, az 5000-es porton figyel");
});
