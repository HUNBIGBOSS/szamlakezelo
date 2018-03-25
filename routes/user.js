
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name = post.username;
      var email = post.email;
      var pass = post.password;
      var pass2 = post.password2;
      function checkEmail(theForm) {
    if (theForm.pass.value != theForm.pass2.value)
    {
      message = "A jelszavak nem egyeznek!";
      res.render('signup.ejs',{message: message});
    } else {
        return true;
    }
}
	if (email == undefined || name == undefined || pass == undefined || pass2 == undefined) {
		message = "Nem hagyhat üresen mezőt!";
		res.render('signup.ejs', {message: message});
	} else {
      var sql = "INSERT INTO `felhasznalok`(email, username, password) VALUES ('" + email + "', '" + name + "','" + pass + "')";

         db.query(sql, function(err, result) {
	 console.log("Új felhasználó lett regisztrálva! Adatok: " + result[0].id);
         message = "Siker! A fiókja létre lett hozva!";
         res.render('signup.ejs',{message: message});
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
            console.log(results[0].id);
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
