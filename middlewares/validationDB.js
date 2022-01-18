const { Category,Product, Role, User } = require("../models");

const checkCategoryIdDB = async (id = "") => {

    if (!(await Category.findById(id).exec())) {
      throw new Error(`Cannot find category with ID ${id}`);
    }
};
const checkProductIdDB = async(id='') =>{
  if(!(await Product.findById(id).exec())){
    throw new Error(`Cannot find product with ID ${id}`)
  }
}
const checkUserIdDB = async (id = "") => {
  if (!(await User.findById(id).exec())) {
    throw new Error(`Cannot find user with ID ${id}`);
  }
};

const checkRoleDB = async (role = "") => {
  if (!(await Role.findOne({ role }))) {
    throw new Error(`The role ${role} is not valid`);
  }
};
const checkEmailDB = async (email = "") => {
  if (await User.findOne({ email })) {
    throw new Error("The email is already in use");
  }
};

module.exports = {
  checkCategoryIdDB,
  checkProductIdDB,
  checkUserIdDB,
  checkRoleDB,
  checkEmailDB,
};
