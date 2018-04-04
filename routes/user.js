
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name = post.username;
      var email = post.email;
      var pass = post.password;
      var pass2 = post.password2;
	if (email === '' || name === '' || pass === '' || pass2 === '') {
		message = "Nem hagyhat üresen mezőt!";
		res.render('signup.ejs', {message: message});
	} else if (pass != pass2){ 
		message = "A jelszavak nem egyeznek!";
		res.render('signup.ejs', {message: message});
		} else {
			db.query("SELECT email FROM felhasznalok", function(err, results) {
			var hossz = results.length;
			var emails = [];
			for (var x in results) {
				emails.push(results[x].email);
			}
			if (emails.indexOf(email) > -1) {
					message = "Ezzel az email címmel már regisztráltak!";
					res.render('signup.ejs', {message: message});
					} else {
         db.query("INSERT INTO felhasznalok (email, username, password) VALUES (?, ?, ?)", [email, name, pass], function(err, result) {
	 if (err) throw err;
	 db.query("SELECT * FROM felhasznalok WHERE email = ?", [email], function (err, result) {
      var userid = result[0].user_id
	 if (err) throw err;
	 console.log("Új felhasználó lett regisztrálva! Adatok: " + result[0].email);
         db.query("INSERT INTO user_szamla_kapcs (user_id) VALUES (?)", [userid], function(err, result) {
         message = "Siker! A fiókja létre lett hozva!";
         res.render('signup.ejs',{message: message});
		});
	});
    });
					}
			});
	}
   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
      db.query("SELECT * FROM felhasznalok WHERE username = ? AND password = ?", [name, pass], function(err, results){      
         if(results.length){
            req.session.userId = results[0].user_id;
            req.session.user = results[0];
            console.log(results[0].user_id + ". ID-vel rendelkező felhasználó bejelentkezett!");
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Hibás felhasználónév/jelszó!';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
 
exports.dashboard = function(req, res, next){
   var user =  req.session.user,
   userId = req.session.user_id;
   db.query("SELECT * FROM felhasznalok WHERE user_id = ?", [userId], function(err, results) {
	//if (userId == null) {
	//	res.redirect("/login");
	//} else {
	if (err) throw err;
	res.render('dashboard.ejs', {user:user});
	console.log('ddd='+userId);
	});
 //};
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   var logoutId = req.session.user_id;
   console.log("A " + logoutId + "-s ID-vel rendelkező felhasználó kijelentkezett!");
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `felhasznalok` WHERE user_id='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `felhasznalok` WHERE user_id='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
//--------------------------------create new bill--------------------------------------------------
exports.create=function(req, res) {
	if(req.method == "POST"){
      message = '';
      var post = req.body;
      var nev;
      var kelte;
      var sorszam = req.sorszam;
      var szallitonev = req.szallitonev;
      var szallitocim = req.szallitocim;
      var szallitoadoszam = req.szallitoadoszam;
      var szallitoszamlaszam = req.szallitoszamlaszam;
      var vevonev = req.vevonev;
      var vevocim = req.vevocim;
      var vevoadoszam = req.vevoadoszam;
      var vevoszamlaszam = req.vevoszamlaszam;
      var fizmod = req.fizmod;
      var teljdatum = req.teljdatum;
      var keltedatum = req.keltedatum;
      var esedekesseg = req.esedekesseg;
      
   } else {
      res.render('create');
   }
};