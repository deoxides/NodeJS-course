const bcryptjs = require('bcryptjs')

const hashPassword = (password ='') =>{
    const salt = bcryptjs.genSaltSync();
    const hashedpassword = bcryptjs.hashSync(password,salt);
    return hashedpassword;
}

module.exports = {
    hashPassword
}