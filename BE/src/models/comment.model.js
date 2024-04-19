const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    comment : {
        type: String,
        required: true,
        trim:true
    }
}, { timestamps: true });


const commentSchema = mongoose.model("Comment", CommentSchema)
module.exports = commentSchema;




