const jwt = require('jsonwebtoken');

const createToken = (uid = '') => {
    return new Promise((resolve,reject) =>{
        const payload = {uid}
        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn:'4h'
        },(err,token) =>{
            if(err){
                console.log(err)
                reject('The token was not created')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    createToken
}