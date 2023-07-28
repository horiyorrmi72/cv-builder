const mongoose = require('mongoose');
const User = require('./users');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    title:{
        type:String,

    },
    project_description:{
        type:String
    },
    project_image:{
        type:String
    },
    project_link:{
        type:String
    }
});

const Portfolio = mongoose.model('Portfolio',portfolioSchema);
module.exports = Portfolio;