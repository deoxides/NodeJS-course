const Role = require('../models/ODM/Role.model');
const User = require('../models/ODM/User.model');

const checkUserIdDB = async(id = '') => {
    if (! await User.findById(id).exec()) {
        throw new Error(`Cannot find user with ID ${id}`);
      }
}

const checkRoleDB = async (role = '') => {
    if(!await Role.findOne({role})){
        throw new Error(`The role ${role} is not valid`);
    }
  }
  const checkEmailDB = async(email = '') =>{
    if (await User.findOne({ email })) {
      throw new Error('The email is already in use');
    }
  }

module.exports = {
    checkUserIdDB,
    checkRoleDB,
    checkEmailDB
}