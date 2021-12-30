const { validationResult } = require("express-validator");

const Role = require('../models/ODM/Role.model');
const User = require('../models/ODM/User.model')

const handlerErrorResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }
  next();
};


module.exports = {
  handlerErrorResult
};
