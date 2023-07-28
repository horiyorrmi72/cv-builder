const mongoose = require('mongoose');
const User = require('./users');
const { Schema } = mongoose;

const eduSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true,

    },
    schoolName:{
        type:String,
        required:true
    },
    discipline:{
        type:String,
        required:true
    },
    certification:{
        type:String,
        required:true
    },
    duration:[
        {
        startYear:{
            type:Date,
            required:true
        },
        endYear:{
            type:Date,
            required:true
        }
    }
    ]
});

const Edu = mongoose.model('Education',eduSchema);
module.exports = Edu;