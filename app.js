var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              database : 'szamlakezelo'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/login', user.login);
app.post('/login', user.login);//call for login post
app.get('/signup', user.signup);
app.post('/signup', user.signup);//call for signup post

app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
 
//Middleware
app.listen(3000, function() {
	console.log("A szerver működik, a 3000-es porton figyel!");
});

