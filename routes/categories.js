var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blog");

var allBlogs;
    Blog.find({}, function(err, allblogs){
        if(err){
            console.log(err);
        }else{
            allBlogs = allblogs;
        }
    });

router.get("/adventure", function(req, res){
    Blog.find({"label" : "ADVENTURE"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/animal", function(req, res){
    Blog.find({"label" : "ANIMAL"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/anime", function(req, res){
    Blog.find({"label" : "ANIME"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/book", function(req, res){
    Blog.find({"label" : "BOOK"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/beauty", function(req, res){
    Blog.find({"label" : "BEAUTY"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/cooking", function(req, res){
    Blog.find({"label" : "COOKING"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/diy", function(req, res){
    Blog.find({"label" : "DIY"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/event", function(req, res){
    Blog.find({"label" : "EVENT"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/fashion", function(req, res){
    Blog.find({"label" : "FASHION"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/feeling", function(req, res){
    Blog.find({"label" : "FEELING"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/food", function(req, res){
    Blog.find({"label" : "FOOD"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/game", function(req, res){
    Blog.find({"label" : "GAME"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/learning", function(req, res){
    Blog.find({"label" : "LEARNING"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/lifestyle", function(req, res){
    Blog.find({"label" : "LIFESTYLE"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/manga", function(req, res){
    Blog.find({"label" : "MANGA"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/movie", function(req, res){
    Blog.find({"label" : "MOVIE"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/music", function(req, res){
    Blog.find({"label" : "MUSIC"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/sport", function(req, res){
    Blog.find({"label" : "SPORT"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/story", function(req, res){
    Blog.find({"label" : "STORY"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

router.get("/travel", function(req, res){
    Blog.find({"label" : "TRAVEL"}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("blogs/index", {blogs: blogs, allBlogs: allBlogs});
      }
    });
});

module.exports = router;