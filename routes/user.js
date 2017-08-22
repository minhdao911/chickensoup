var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    middleware = require("../middleware");

//---------------
//  USER ROUTE
//---------------

//show all users
router.get("/", function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        }else{
            res.render("users/show", {bloggers: users});
        }
    });
});

//show user home
router.get("/:id", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/home", {user: user});
        }
    });
});

//show user blogs
router.get("/:id/blogs", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/blog", {user: user});
        }
    });
});

//show user feed
router.get("/:id/feeds", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/feed", {user: user});
        }
    });
});

//show user message
router.get("/:id/messages", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/message", {user: user});
        }
    });
});

//show user following
router.get("/:id/following", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/following", {user: user});
        }
    });
});

//show user follower
router.get("/:id/followers", function(req, res){
    User.findById(req.params.id).populate("blogs").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("users/follower", {user: user});
        }
    });
});

//image update
router.put("/:id/img", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, {new: true}, function(err, newUser){
        if(err){
            console.log(err);
        }else{
            newUser.follower.forEach(function(follower){
                User.findById(follower.id, function(err, foundFollower){
                    if(err){
                        console.log(err);
                    }else{
                        foundFollower.following.forEach(function(following){
                            if(following.id.equals(req.params.id)){
                                following.avatar = newUser.avatar;
                            }
                        });
                    }
                    foundFollower.save();
                });
            });
            newUser.following.forEach(function(following){
                User.findById(following.id, function(err, foundFollowing){
                    if(err){
                        console.log(err);
                    }else{
                        foundFollowing.follower.forEach(function(follower){
                            if(follower.id.equals(req.params.id)){
                                follower.avatar = newUser.avatar;
                            }
                        });
                    }
                    foundFollowing.save();
                });
            });
            res.json(newUser);
        }
    });
});

//edit profile
router.get("/:id/profile/edit", function(req, res){
    res.render("users/profile");
});
router.post("/:id/profile", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/users/" + req.params.id);
        }
    });
});

//follow routes
router.put("/:id/:currentUser_id/follow", middleware.isLoggedIn, function(req, res){
    //add followingUser to currentUser
    User.findById(req.params.currentUser_id, function(err, follower){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.id, function(err, followedUser){
                if(err){
                    console.log(err);
                }else{
                    var followedId = followedUser._id,
                        followedUsername = followedUser.username,
                        followedAvatar = followedUser.avatar,
                        followedFollower = followedUser.follower.length + 1,
                        followedBlogs = followedUser.blogs.length;
                    var newFollowedUser = {
                        id: followedId, 
                        username: followedUsername,
                        avatar: followedAvatar,
                        follower: followedFollower,
                        blogs: followedBlogs
                    }
                    follower.following.push(newFollowedUser);
                    follower.save();
                }
            });
        }
    });
    //add currentUser to followingUser
    User.findById(req.params.id, function(err, followedUser){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.currentUser_id, function(err, follower){
                if(err){
                    console.log(err);
                }else{
                    var followerId = follower._id,
                        followerUsername = follower.username,
                        followerAvatar = follower.avatar,
                        followerFollower = follower.follower.length,
                        followerBlogs = follower.blogs.length;
                    var newFollower = {
                        id: followerId, 
                        username: followerUsername,
                        avatar: followerAvatar,
                        follower: followerFollower,
                        blogs: followerBlogs
                    };
                    var newFeed = {
                        user_id: follower._id,
                        blog_id: follower._id,
                        created: new Date(),
                        avatar: follower.avatar,
                        username: follower.username,
                        content: "started following you"
                    };
                    followedUser.follower.push(newFollower);
                    followedUser.feeds.push(newFeed);
                    followedUser.save();
                    followedUser.follower.forEach(function(follower){
                        User.findById(follower.id, function(err, foundFollower){
                            if(err){
                                console.log(err);
                            }else{
                                //update number of followers for following users
                                if(!follower.id.equals(req.params.currentUser_id)){
                                    foundFollower.following.forEach(function(following){
                                        if(following.id.equals(followedUser._id)){
                                            following.follower = followedUser.follower.length;
                                        }
                                    });
                                }
                                foundFollower.save();
                            }
                        });
                    });
                    followedUser.following.forEach(function(following){
                        User.findById(following.id, function(err, foundFollowing){
                            if(err){
                                console.log(err);
                            }else{
                                //update number of followers for followers
                                foundFollowing.follower.forEach(function(follower){
                                    if(follower.id.equals(followedUser._id)){
                                        follower.follower = followedUser.follower.length;
                                    }
                                });
                                foundFollowing.save();
                            }
                        });
                    });
                    res.json(followedUser);
                }
            });
        }
        
    });
});

//unfollow routes
router.put("/:id/:currentUser_id/unfollow", function(req, res){
    //remove following founduser from current user
    User.findById(req.params.id, function(err, followedUser){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.currentUser_id, function(err, followerUser){
                if(err){
                    console.log(err);
                }else{
                    var followedUser_id;
                    for(var i=0; i<followerUser.following.length; i++){
                        if(followerUser.following[i].id.equals(followedUser._id)){
                            followedUser_id = followerUser.following[i]._id;
                            break;
                        }
                    }
                    var index;
                    for(var i=0; i<followerUser.following.length; i++){
                        if(followerUser.following[i]._id === followedUser_id){
                            index = i;
                            break;
                        }
                    }
                    followerUser.following.splice(index, 1);
                    followerUser.save();
                }
            });
        }
    });    
    //remove current user follower from founduser
    User.findById(req.params.currentUser_id, function(err, follower){
        if(err){
            console.log(err);
        }else{
            User.findById(req.params.id, function(err, followedUser){
                if(err){
                    console.log(err);
                }else{
                    //find current user from followers to remove
                    var followerUser_id;
                    for(var i=0; i<followedUser.follower.length; i++){
                        if(followedUser.follower[i].id.equals(follower._id)){
                            followerUser_id = followedUser.follower[i]._id;
                            break;
                        }
                    }
                    var index;
                    for(var i=0; i<followedUser.follower.length; i++){
                        if(followedUser.follower[i]._id === followerUser_id){
                            index = i;
                            break;
                        }
                    }
                    followedUser.follower.splice(index, 1);
                    followedUser.save();
                    followedUser.follower.forEach(function(follower){
                        User.findById(follower.id, function(err, foundFollower){
                            if(err){
                                console.log(err);
                            }else{
                                if(!follower.id.equals(req.params.currentUser_id)){
                                    foundFollower.following.forEach(function(following){
                                        if(following.id.equals(followedUser._id)){
                                            //console.log("follower" + following.follower);
                                            following.follower = followedUser.follower.length;
                                        }
                                    });
                                }
                                foundFollower.save();
                            }
                        });
                    });
                    //update number of followers for following users
                    followedUser.following.forEach(function(following){
                        User.findById(following.id, function(err, foundFollowing){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollowing.follower.forEach(function(follower){
                                    if(follower.id.equals(followedUser._id)){
                                        follower.follower = followedUser.follower.length;
                                    }
                                });
                                foundFollowing.save();
                            }
                        });
                    });
                    res.json(followedUser);
                }
            });
        }
    });
});

//delete feed
router.put("/:id/:feed_id/delfeed", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            for(var i=0; i<foundUser.feeds.length; i++){
                if(foundUser.feeds[i]._id.equals(req.params.feed_id)){
                    foundUser.feeds.splice(i,1);
                    break;
                }
            }
            foundUser.save(function(err, savedUser){
                if(err){
                    console.log(err);
                }else{
                    res.json(foundUser);
                }
            });
        }
    });
});


module.exports = router;