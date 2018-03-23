var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/pages/';
var mysql = require('mysql');
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
