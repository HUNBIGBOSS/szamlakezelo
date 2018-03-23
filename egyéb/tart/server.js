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

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

// Index = /
router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

// Login = /login
router.get("/login",function(req,res){
  res.sendFile(path + "login.html");
});

// Register = /register
router.get("/register", function(req,res){
  res.sendFile(path + "register.html");
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
app.listen(3000, function() {
	console.log("A szerver működik, az 5000-es porton figyel");
});
