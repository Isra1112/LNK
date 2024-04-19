const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const DataSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim:true
    },
    date : {
        type: Date,
        required: true,
        trim:true,
        get: (date)=> date.toLocaleDateString()
    },
    description : {
        type: String,
        required: true,
        trim:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

DataSchema.virtual('formattedDate').get(function() {
    const date = this.birthDate;
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  });

const dataSchema = mongoose.model("Data", DataSchema)
module.exports = dataSchema;




