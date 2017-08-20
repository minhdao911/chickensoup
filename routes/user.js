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
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, newUserImg){
        if(err){
            console.log(err);
        }else{
            res.redirect("/users/" + req.params.id);
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
                        User.findById(follower.id, function(err, foundFollwer){
                            if(err){
                                console.log(err);
                            }else{
                                foundFollwer.following.forEach(function(following){
                                    if(following.id.equals(followedUser._id)){
                                        //console.log("follower" + following.follower);
                                        following.follower++;
                                    }
                                });
                                foundFollwer.save();
                            }
                        });
                    });
                }
            });
        }
    });
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
                    follower.save(function(err, savedUser){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("back");
                        }
                    });
                }
            });
        }
    });
});

//unfollow routes
router.put("/:id/:currentUser_id/unfollow", function(req, res){
    User.findById(req.params.currentUser_id, function(err, follower){
        if(err){
            console.log(err);
        }else{
            var followerId = follower._id,
                followerUsername = follower.username,
                followerAvatar = follower.avatar,
                followerFollower = follower.follower.length,
                followerBlogs = follower.blogs.length;
            var Follower = {
                id: followerId, 
                username: followerUsername,
                avatar: followerAvatar,
                follower: followerFollower,
                blogs: followerBlogs
            }
            User.findById(req.params.id, function(err, followingUser){
                if(err){
                    console.log(err);
                }else{
                    var index = followingUser.follower.indexOf(Follower);
                    followingUser.follower.splice(index, 1);
                    followingUser.save();
                }
            });
        }
    });
    User.findById(req.params.id, function(err, following){
        if(err){
            console.log(err);
        }else{
            var followingId = following._id,
                followingUsername = following.username,
                followingAvatar = following.avatar,
                followingFollower = following.follower.length,
                followingBlogs = following.blogs.length;
            var Following = {
                id: followingId, 
                username: followingUsername,
                avatar: followingAvatar,
                follower: followingFollower,
                blogs: followingBlogs
            }
            User.findById(req.params.currentUser_id, function(err, followerUser){
                if(err){
                    console.log(err);
                }else{
                    var index = followerUser.following.indexOf(Following);
                    followerUser.following.splice(index, 1);
                    followerUser.save(function(err, savedUser){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/users/" + req.params.id);
                        }
                    });
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
                    res.redirect("/users/" + req.params.id + "/feeds");
                }
            });
        }
    });
});

module.exports = router;