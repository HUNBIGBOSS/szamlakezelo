
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
	 console.log("Új felhasználó lett regisztrálva! E-mail címe: " + result[0].email);
         message = "Siker! A fiókja létre lett hozva!";
         res.render('signup.ejs',{message: message});
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
      db.query("SELECT user_id, email, username, password FROM felhasznalok WHERE username = ? AND password = ?", [name, pass], function(err, results){      
         if(results.length){
            req.session.user = results[0];
            console.log("A(z) " + results[0].user_id + ". ID-vel rendelkező felhasználó bejelentkezett!");
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Hibás felhasználónév/jelszó!';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login.ejs',{message: message});
   }
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
 
exports.dashboard = function(req, res, next){
   message = '';
   szamlaneve = '';
   kelte = '';
   esedek = '';
   var user =  req.session.user;
   if (user === undefined) {
      res.redirect("/login");
      return;
   }
   var userId = req.session.user.user_id;
   var username = req.session.user.username;
   db.query("SELECT `szamlak`.* FROM `felhasznalok` INNER JOIN `user_szamla_kapcs` ON `user_szamla_kapcs`.`user_id` = `felhasznalok`.`user_id` INNER JOIN `szamlak` ON `user_szamla_kapcs`.`szamla_id` = `szamlak`.`szamla_id` WHERE (`felhasznalok`.`user_id` = ?)", [userId], function(err, results) {
      if (err) throw err;
      if (results.length == 0) {
         message = "Önnek még nincsenek felvitt számlái!";
         res.render('dashboard.ejs', {user:user, username:username, message:message});
         return;
      } else {
         szamlaneve = 'Számla neve';
         kelte = 'Kelte';
         esedek = 'Esedékesség';
         res.render('dashboard.ejs', {user:user, username:username, message:message, data:results, szamlaneve:szamlaneve, kelte:kelte, esedek:esedek});
     }
   });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req, res){
   var user = req.session.user;
   if (user === undefined) {
      res.redirect("/login");
      return;
   }
   var logoutId = req.session.user.user_id;
   console.log("A(z) " + logoutId + ". ID-vel rendelkező felhasználó kijelentkezett!");
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------modify user details after login--------------------------------
exports.profile = function(req, res, next){
   message = '';
   var user =  req.session.user;
   if (user === undefined) {
      res.redirect("/login");
      return;
   }
   var userId = req.session.user.user_id;
   var username = req.session.user.username;

   if(req.method == "POST") {
      if (user === undefined) {
      res.redirect("/login");
      return;
   }
   var post = req.body;
   var veznev = post.veznev;
   var kernev = post.kernev;
   db.query("SELECT * FROM felhasznalok WHERE user_id = ?", [userId], function(err, result){
      if (err) throw err;
         db.query("UPDATE felhasznalok SET veznev = ?, kernev = ? WHERE user_id = ?", [veznev, kernev, userId], function(err) {
            if (err) throw err;
            message = "A felhasználói adatok frissültek!"
            console.log("A(z) " + userId + ". ID-vel rendelkező felhasználó adatai megváltoztak!");
         })
      res.render('profile.ejs',{user:user, username:username, message:message});
   });
} else {
   res.render('profile.ejs',{user:user, message:message, username:username});
   }
};
//--------------------------------create new bill--------------------------------------------------
exports.create=function(req, res, next) {
   message = '';
   b_ar = '';
   b_afa = '';
   b_afaertek = '';
   b_brutto = '';
   var user =  req.session.user;
   if (user === undefined) {
      res.redirect("/login");
      return;
   }
   var userId = req.session.user.user_id;
   var username = req.session.user.username;
   db.query("SELECT * FROM felhasznalok WHERE user_id = ?", [userId], function(err, result) {
	if(req.method == "POST") {
      if (user === undefined) {
      res.redirect("/login");
      return;
   }
      var post = req.body;
      var nev = post.nev;
      var kelte = new Date();
      var dd = kelte.getDate();
      var mm = kelte.getMonth()+1;
      var yyyy = kelte.getFullYear();
      if(dd<10) {
          dd = '0'+dd;
      }
      if(mm<10) {
         mm = '0'+mm;
      } 
      kelte = yyyy + '/' + mm + '/' + dd;
      var sorszam = post.sorszam;
      var szamla_nev = post.szamla_nev;
      var szallito_nev = post.szallito_nev;
      var szallito_cim = post.szallito_cim;
      var szallito_adoszam = post.szallito_adoszam;
      var szallito_szamlaszam = post.szallito_szamlaszam;
      var vevo_nev = post.vevo_nev;
      var vevo_cim = post.vevo_cim;
      var vevo_adoszam = post.vevo_adoszam;
      var vevo_szamlaszam = post.vevo_szamlaszam;
      var fiz_mod = post.fiz_mod;
      var telj_datum = post.telj_datum;
      var kelte_datum = post.kelte_datum;
      var esedekesseg = post.esedekesseg;
      var megnevezes = post.megnevezes;
      var mennyiseg = post.mennyiseg;
      var ar = post.ar;
      var afa = post.afa;
      var afaertek = post.afaertek;
      var brutto = post.brutto;
      db.query("INSERT INTO szamlak (sorszam, szamla_nev, szallito_nev, szallito_cim, szallito_adoszam, szallito_szamlaszam, vevo_nev, vevo_cim, vevo_adoszam, vevo_szamlaszam, fiz_mod, telj_datum, kelte_datum, esedekesseg, megnevezes, mennyiseg, ar, afa, afaertek, brutto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [sorszam, szamla_nev, szallito_nev, szallito_cim, szallito_adoszam, szallito_szamlaszam, vevo_nev, vevo_cim, vevo_adoszam, vevo_szamlaszam, fiz_mod, telj_datum, kelte_datum, esedekesseg, megnevezes, mennyiseg, ar, afa, afaertek, brutto], function (err, results) {
         if (err) throw err;
         db.query("SELECT * FROM szamlak WHERE szamla_nev = ? AND sorszam = ?", [szamla_nev, sorszam], function(err, results) {
            if (err) throw err;
            var szamlaID = results[0].szamla_id;
            var sorszam = results[0].sorszam;
            var kelte = results[0].kelte;
         db.query("INSERT INTO user_szamla_kapcs (user_id, szamla_id) VALUES (?, ?)", [userId, szamlaID], function(err, results) {
            if (err) throw err;
         console.log("Új számlafelvitel! Főbb adatok:\nID: " + szamlaID + "\nSorszám: " + sorszam + "\nKelte: " + kelte);
         message = "Sikeres számlafelvitel!";
         b_ar = ar + " Ft";
         b_afa = afa + "%";
         b_afaertek = afaertek + " Ft";
         b_brutto = brutto + " Ft";
         res.render('create.ejs', {message: message, user: user, username: username, b_ar: b_ar, b_afa: b_afa, b_afaertek: b_afaertek, b_brutto: b_brutto});
      });
      });
      });
   } else {
      if (userId === undefined) {
         res.redirect("/login");
         return;
      }
      res.render('create.ejs');
   }
});
};