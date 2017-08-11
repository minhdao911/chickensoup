var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blog");

router.get("/search", function(req, res){
    // console.log(req.query.title);
    Blog.find({'title' : new RegExp(req.query.title, 'i')}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
        //   console.log(blogs);
          res.render("blogs/search", {blogs: blogs});
        //   res.json(blogs);
      }
    });
});

module.exports = router;