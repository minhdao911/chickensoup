var express = require("express"),
    router = express.Router({mergeParams: true}),
    Blog = require("../models/blog"),
    Comment = require("../models/comment"),
    User = require("../models/user"),
    middleware = require("../middleware");

//----------------
//COMMENTS ROUTE
//----------------

//create comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            res.redirect("/blogs/"+req.params.id);
        }else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                }else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.author.avatar = req.user.avatar;
                    newComment.save();
                    User.findById(blog.author.id, function(err, foundUser){
                        if(err){
                            console.log(err);
                        }else{
                            var newFeed = {
                                        user_id: req.user._id,
                                        blog_id: req.params.id,
                                        created: new Date(),
                                        avatar: req.user.avatar,
                                        username: req.user.username,
                                        content: "commented on your blog"
                                    };
                            foundUser.feeds.push(newFeed);
                            foundUser.save();
                        }
                    });
                    blog.comments.push(newComment);
                    blog.save(function(err, savedBlog){
                        if(err){
                            console.log(err);
                        }else{
                            res.json(newComment);
                        }
                    });
                }
            });
        }
    });
});

//edit comment
//update comment
router.put("/:comment_id", middleware.checkCommentAuthorization, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true}, function(err, updatedComment){
        if(err){
            console.log(err);
        }else{
            res.json(updatedComment);
        }
    });
});

//delete comment
router.delete("/:comment_id", middleware.checkCommentAuthorization, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err);
        }else{
            Blog.findById(req.params.id, function(err, foundBlog){
                if(err){
                    console.log(err);
                }else{
                    var index;
                    for(var i=0; i<foundBlog.comments.length; i++){
                        if(foundBlog.comments[i].equals(req.params.comment_id)){
                            index = i;
                            break;
                        }
                    }
                    foundBlog.comments.splice(index, 1);
                    foundBlog.save();
                }
            });
            res.json(comment);
        }
    });
});

module.exports = router;
