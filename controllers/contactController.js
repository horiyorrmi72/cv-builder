const Contact = require('../models/contact');
const messages = require('../utils/messages');

const getContacts = async (req, res, next) => {
    try {
        const usersContact = await Contact.find();
        return res.json({status:200, message:'Contacts List', contacts:usersContact});
    } catch (error) {

        return res.json({status:500, message:error.message});
        
    }
}

const addContacts = async (req, res) => {
    try {
        const {phoneNumber,address} = req.body;
        const user_id = req.user._id;
        if(!phoneNumber || !address){
            return res.json({status:1001, message:messages.missingInputErrorMessage});
        }
        const userContact = new Contact({
            phoneNumber,
            address,
            user_id
        })
        await userContact.save();
        return res.json({status:200, message:messages.success, contact:userContact});

    } catch (error) {
        return res.json({status:500, message:error.message});
        
    }
}

const updateContact = async (req,res) =>{
    try {
        const {contactId} = req.params;
        const {address,phoneNumber} = req.body;
        const contactToUpdate = await Contact.findOneAndUpdate({_Id:contactId},{address:address, phoneNumber:phoneNumber}, {new:true});
        if(!contactToUpdate){
            return res.json({status:400,message:error.message});
        }
        return res.json({status:200,message:'Contact updated successfully',data:contactToUpdate});
    } catch (error) {
        return res.json({status:500, message:error.message});
        
    }
}

const deleteContact = async (req,res) =>{
    try{
    const {id} = req.params;
    const contactToDelete = await Contact.deleteOne({_id:id});
    if(contactToDelete.deletedCount === 0){
       return res.json({status:400, message:'Contact Not Found'});
    }
    return res.json({status:200, message:'Contact Deleted', deletedContatct:contactToDelete});

    }
    catch (error) {
        return res.json({status:500, message:'Error', error:error.message});

    }

}


module.exports = {
    getContacts,
    addContacts,
    updateContact,
    deleteContact
}