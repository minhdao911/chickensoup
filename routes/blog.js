var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blog"),
    User = require("../models/user"),
    middleware = require("../middleware"),
    Comment = require("../models/comment");

//----------------
//BLOGS ROUTE
//----------------

//index route
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("blogs/index", {blogs: blogs, allBlogs: blogs});      
        }
    });
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/new");    
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
   //create new post
   var title = req.body.title,
       label = req.body.label,
       image = req.body.image,
       body = req.body.body,
       author = {
           id: req.user._id,
           username: req.user.username
       };
    var newBlog = {title: title, label: label, image: image, body: body, author: author};
    Blog.create(newBlog, function(err, newBlog){
        if(err){
           console.log(err);
        }else{
           req.flash("success", "New blog created!!");
           //redirect to index
           User.findById(req.user._id, function(err, foundUser){
                if(err){
                   console.log(err);
               }else{
                   foundUser.following.forEach(function(following){
                        User.findById(following.id, function(err, foundFollowing){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollowing.follower.forEach(function(follower){
                                    if(follower.id.equals(foundUser._id)){
                                        follower.blogs++;
                                    }
                                });
                                foundFollowing.save();
                            }
                        });
                   });
                   foundUser.follower.forEach(function(follower){
                        User.findById(follower.id, function(err, foundFollower){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollower.following.forEach(function(following){
                                    if(following.id.equals(foundUser._id)){
                                        following.blogs++;
                                    }
                                });
                                var newFeed = {
                                    user_id: foundUser._id,
                                    blog_id: newBlog._id,
                                    created: new Date(),
                                    avatar: foundUser.avatar,
                                    username: foundUser.username,
                                    content: "posted a new blog '" + title + "'"
                                };
                                foundFollower.feeds.push(newFeed);
                                foundFollower.save();
                            }
                        });
                   });
                   foundUser.blogs.push(newBlog);
                   foundUser.save();
               }
            });
            res.redirect("/blogs");
        }
    });
});

//show blog
router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, chosenBlog){
        if(err){
            console.log(err);
        }else{
            Blog.find({}, function(err, allblogs){
                if(err){
                    console.log(err);
                }else{
                    res.render("blogs/show", {blog: chosenBlog, allBlogs: allblogs});
                }
            });
        }
    });
});

//edit route
router.get("/:id/edit", middleware.checkBlogAuthorization, function(req, res){
    Blog.findById(req.params.id, function(err, chosenBlog){
        if(err){
            console.log(err);
        }else{
            res.render("blogs/edit", {blog: chosenBlog});     
        }
    });
});

//update route
router.put("/:id", middleware.checkBlogAuthorization, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Blog edited!");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//delete route
router.delete("/:id", middleware.checkBlogAuthorization, function(req, res){
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Blog deleted!");
            User.findById(req.user._id, function(err, foundUser){
                if(err){
                   console.log(err);
               }else{
                   //remove blog from user database
                   var index;
                   for(var i=0; i<foundUser.blogs.length; i++){
                       if(foundUser.blogs[i].equals(req.params.id)){
                           index = i;
                           break;
                       }
                   }
                   foundUser.blogs.splice(index, 1);
                   foundUser.save();
                   //update number of blogs to following users
                   foundUser.following.forEach(function(following){
                        User.findById(following.id, function(err, foundFollowing){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollowing.follower.forEach(function(follower){
                                    if(follower.id.equals(foundUser._id)){
                                        follower.blogs--;
                                    }
                                });
                                foundFollowing.save();
                            }
                        });
                   });
                   //update number of blogs to followers
                   foundUser.follower.forEach(function(follower){
                        User.findById(follower.id, function(err, foundFollower){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollower.following.forEach(function(following){
                                    if(following.id.equals(foundUser._id)){
                                        following.blogs--;
                                    }
                                });
                                foundFollower.save();
                            }
                        });
                   });
               }
            });
            res.redirect("/blogs");
        }
    });
});

//like route
router.put("/:id/users/:user_id/addlike", middleware.isLoggedIn, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, {new: true}, function(err, blog){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.user_id, function(err, user){
                if(err){
                    console.log(err);
                }else{
                    user.likes.push(blog);
                    user.save();
                }
            });
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
                            content: "liked your blog"
                        };
                    foundUser.feeds.push(newFeed);
                    foundUser.save();
                }
            });
            res.json(blog);
        }
    });
});

router.put("/:id/users/:user_id/minuslike", middleware.isLoggedIn, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, {new: true}, function(err, blog){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.user_id, function(err, user){
                if(err){
                    console.log(err);
                }else{
                    var index = user.likes.indexOf(req.params.id);
                    console.log(index);
                    if(index > -1){
                        user.likes.splice(index, 1);
                    }
                    user.save();
                }
            });
            res.json(blog);
        }
    });
});


module.exports = router;
