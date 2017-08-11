var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    middleware = require("../middleware");

router.get("/", function(req, res){
    res.redirect("/blogs");
});


//----------------
//AUTH ROUTE
//----------------

//show register form
router.get("/register", function(req, res){
    res.render("register");
});
//signup logic
router.post("/register", function(req, res){
    if(req.body.avatar !== ""){
        User.register(new User({username: req.body.username, avatar: req.body.avatar}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                res.redirect("/register");
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/blogs");
                });  
            }
        });
    }else{
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                res.redirect("/register");
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/blogs");
                });  
            }
        });
    }
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect:"/blogs",
    failureRedirect:"/login"
}),function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/blogs");
});

module.exports = router;