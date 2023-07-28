const mongoose = require('mongoose');
const {Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    googleId:{
        type:String
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;