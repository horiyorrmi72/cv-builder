const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hashPassword = async(password) =>{
   const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;

};


const checkPassword = async(password,hash) =>{
    try {
        const matchPassword = await bcrypt.compare(password,hash);
        return matchPassword;    
    } catch (error) {
        throw error;
        
    }
};

module.exports = {
    hashPassword,
    checkPassword
}