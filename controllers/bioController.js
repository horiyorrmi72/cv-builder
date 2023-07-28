const Bio = require('../models/bio');
const messages = require('../utils/messages');

const addBio = async (req, res) =>{
    try {
        const {firstname, lastname, picture, summary} = req.body;
        if(!firstname || !lastname || !summary){
            return res.json({status:403, message:messages.missingInputErrorMessage});
        
        }
        const user_id = req.user._id;
        const bio = new Bio({
            firstname,
            lastname,
            picture,
            summary,
            user_id
        })
        await bio.save();
        console.log(bio);
        return res.json({status:200, message:'Biodata added Successfully',data:bio})
    } catch (error) {
        if(error){
            console.log(error)
            return res.json({status:500, message:error.message});
        }
        
    }
}

const updateBio = async (req, res) =>{
    const {id} = req.params;
    const {firstname,lastname,picture,summary} = req.body;
    try {
        const query = await Bio.findByIdAndUpdate(id,{firstname:firstname,lastname:lastname,summary:summary,picture:picture},{new:true});
        if(!firstname.trim() || !lastname.trim() || !picture.trim() || !summary.trim()){
            return res.json({status:1001, message:messages.missingInputErrorMessage})
        }
        if(!query){
            return res.json({status:404,message:'BioData not found'})
        }
        return res.json({status:200,message:'BioData updated Successfully',data:query});
    } catch (error) {
            return res.json({status:500,message:error.message});
        
        
    }
}

module.exports = {
    addBio,
    updateBio
}