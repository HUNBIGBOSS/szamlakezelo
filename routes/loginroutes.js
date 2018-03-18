var mysql = require('mysql');
var db_connect = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'root',
	database: 'szamlakezelo'
});
db_connect.connect(function(err) {
if(!err) {
	console.log("Az adatbázis csatlakoztatva van!");
} else {
	console.log("Hiba az adatbázishoz való csatlakozás közben.");
}
});
//REGISTER
exports.register = function(datarequest,dataresults) {
	var user={
		"email":datarequest.body.email,
		"password":datarequest.body.password
	}
db_connect.query('INSERT INTO users SET?',user, function(error, response, fields) {
	if (error) {
		console.log("Hiba történt a regisztráció során!", error);
		dataresults.send({
			"Kód":400,
			"Sikertelen":"Hiba történt!"
		})
	} else {
		console.log('Valami: ', response);
		dataresults.send({
			"Kód":200,
			"Siker":"Sikeres regisztráció!"
		});
	}
	});
}
//LOGIN
exports.login = function(datarequest,dataresults) {
	var email = datarequest.body.email;
	var password = datarequest.body.password;
	db_connectquery('SELECT * FROM users WHERE email = ?',[email], function (error, response, fields) {
	if (error) {
		dataresults.send({
			"Kód":400,
			"Sikertelen":"Hiba történt!"
		})
	} else {
		if(response.length > 0) {
			if([0].password == password) {
				dataresults.send({
					"Kód":200,
					"Siker":"Sikeres belépés!"
				});
			}
			else {
				dataresults.send({
					"Kód":204,
					"Sikertelen":"Az e-mail cím és jelszó nem egyezik!"
				});
			}
		}
		else {
			dataresults.send({
				"Kód":204,
				"Sikertelen":"A megadott email cím nem létezik!"
				});
			}
		}
	});
}
