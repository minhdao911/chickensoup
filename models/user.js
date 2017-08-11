var mongoose = require("mongoose"),
    passpoerLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: {type: String, default: "https://s-media-cache-ak0.pinimg.com/736x/a9/8d/33/a98d336578c49bd121eeb9dc9e51174d--adobe-illustrator-smileys.jpg"},
    blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
    created: {type:Date, default: new Date()},
    likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
    description: String,
    slogan: String,
    interests: String,
    following: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String,
            avatar: String,
            follower: Number,
            blogs: Number
        }
    ],
    follower: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String,
            avatar: String,
            follower: Number,
            blogs: Number
        }
    ],
    feeds: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            blog_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            },
            created: {type: Date},
            avatar: String,
            username: String,
            content: String
        }
    ]
});

userSchema.plugin(passpoerLocalMongoose);

module.exports = mongoose.model("User", userSchema);