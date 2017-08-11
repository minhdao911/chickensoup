var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    Blog            = require("./models/blog"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

//requiring routes
var blogRoutes       = require("./routes/blog"),
    commentRoutes    = require("./routes/comment"),
    userRoutes       = require("./routes/user"),
    authRoutes       = require("./routes/index"),
    searchRoutes     = require("./routes/search"),
    categoriesRoutes = require("./routes/categories");
    
// database config
mongoose.connect("mongodb://localhost/chickensoup", {useMongoClient: true});

    
// app config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());


//auth config
app.use(require("express-session")({
    secret:"091197",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Blog.create({
//     title: "Nothing is forever",
//     image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//     body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//     label: "FEELING"
// });

// var blogs = [
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         },
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         },
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         },
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         },
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         },
//         {
//             title: "Nothing is forever",
//             image: "https://s-media-cache-ak0.pinimg.com/originals/f4/be/0b/f4be0b0d6fbbb4649b797aa24904505e.png",
//             body: "Cause you never think the last time's going to be the last time - you think there will be more. You think you have forever, but you don't.",
//             label: "FEELING"
//         }
//     ];
    
//     Blog.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("removed all campgrounds");
//             blogs.forEach(function(blog){
//                 Blog.create(blog, function(err, data){
//                     if(err){
//                         console.log(err);
//                     }else{
//                         console.log("added a new campground");
//                     }
//                 });
//             });
//         }
//     });

//routes
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/users", userRoutes);
app.use(authRoutes);
app.use(searchRoutes);
app.use("/blogs/categories", categoriesRoutes);

app.get("/demo", function(req, res){
    res.render("demo");
});


app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server is running!");
});