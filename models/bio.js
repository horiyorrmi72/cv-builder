const mongoose = require('mongoose');
const User = require('./users');

const {Schema} = mongoose;

const bioSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    picture:{
        type:String
    },
    summary:{
        type:String,
        required:true,
    }
});

const Bio = mongoose.model('Bio', bioSchema);
module.exports = Bio;