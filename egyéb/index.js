var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/pages/';
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'szamlakezelo'
});

// Login data
loginUser = 'teszt';
loginPasswd = 'elek';

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

// Index = /
router.get("/", function (req, res){
  res.sendFile(path + "index.html");
});

// Login = /login
router.get("/login", function (req, res){
  res.sendFile(path + "login.html");
});

// Register = /register
router.get("/register", function (req, res){
  res.sendFile(path + "register.html");
});

// Login
app.post('/login', function (req, res) {
  var post = req.body;
  console.log("post data: "+post.user);
  console.log(post);
  if (post.user === loginUser && post.password === loginPasswd) {
    // req.session.user_id = user_id;
    res.redirect('/');
  } else {
    res.send('Helytelen felhasználónév vagy jelszó!');
  }
});

// Registration
app.post('/reg', function (req, res) {
  var post = req.body;
  console.log(post);
  dataUsername = post.user;
  dataPasswd = post.password;
  dataEmail = post.email;
  dataConfEmail = post. confEmail;
  if (post.email === post.confEmail) {
    console.log("Username: "+dataUsername);
    console.log("Password: "+dataPasswd);
    console.log("E-mail: "+dataEmail);
    res.send('Sikeres regisztráció!');
  } else {
    console.log("E-mail address error!");
    res.send('Nem egyezik az e-mail cím!');
  }
});

// Database
connection.connect(function(err) {
	if (err) throw err
	console.log('Az adatbázis csatlakoztatva van')

connection.query('CREATE TABLE users(id int not null primary key auto_increment, name varchar(50), password varchar(20))', function(err, result) {
if (err) throw err
	connection.query('INSERT INTO users (name, password) VALUES (?, ?)', ['Teszt', 'Elek'], function(err, result) {
	if (err) throw err
	console.log("A users tábla létre lett hozva")
		connection.query('SELECT * FROM users', function(err, results) {
		if (err) throw err
		console.log("User ID: " + results[0].id)
		console.log("Username: " + results[0].name)
		console.log("Password: " + results[0].password)
			})
		})
	})
});

app.use("/", router);

app.listen(3000, function(){
  console.log("A szerver működik, a 3000-es porton figyel");
});
