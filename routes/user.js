
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res, result){
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
         db.query("INSERT INTO felhasznalok (email, username, password) VALUES (?, ?, ?)", [email, name, pass], function(err, result) {
	 if (err) throw err;
	 db.query("SELECT * FROM felhasznalok WHERE email = ?", [email], function (err, result) {
	 if (err) throw err;
	 console.log("Új felhasználó lett regisztrálva! Adatok: " + result[0]);
         message = "Siker! A fiókja létre lett hozva!";
         res.render('signup.ejs',{message: message});
		});
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
     
      var sql="SELECT user_id, username FROM `felhasznalok` WHERE username='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].user_id;
            req.session.user = results[0];
            console.log(results[0].user_id);
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
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `felhasznalok` WHERE user_id='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
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
