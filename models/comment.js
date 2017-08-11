var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String,
    },
    created : {type: Date, default: new Date()}
});

module.exports = mongoose.model("Comment", commentSchema);