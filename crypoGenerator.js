const crypto = require('crypto');

const generateSecretKeys = function () {
    return new Promise (function (resolve, reject) {
        crypto.randomBytes(64,(err,buff) =>{
            if(err) {
                reject (err);
            }
            resolve (buff.toString('hex'));
    });
});
}
generateSecretKeys()
.then(secretKeys =>{
    console.log(secretKeys);
})
.catch(err =>{
    console.log(err);
});