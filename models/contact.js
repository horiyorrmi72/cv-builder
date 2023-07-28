const mongoose =require('mongoose');
const User =  require('./users');
const {Schema} = mongoose;

const contactSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;