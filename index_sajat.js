var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', function (req, res) {
	res.sendFile('/root/szamlakezelo/index.html');
});



app.listen(3000);
