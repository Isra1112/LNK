const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const LogSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     trim:true
    // },
    activity : {
        type: String,
        required: true,
        trim:true
    },
    // user
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });


const logSchema = mongoose.model("Log", LogSchema)
module.exports = logSchema;




