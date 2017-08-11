var Comment = require("../models/comment"),
    Blog = require("../models/blog");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkBlogAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundBlog.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash("error", "You are not allowed to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }
}

module.exports = middlewareObj;