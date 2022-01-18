const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const { Role, User } = require("../models");

const handlerErrorResult = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }
  next();
};

const validateAdminRole = async (req = request, res = response, next) => {
  const uid = req.user._id;
  if (!uid) {
    return res.status(400).json({
      msg: "Not an valid id in the request",
    });
  }
  try {
    const user = await User.findById(uid);
    if (user.role !== "ADMIN_ROLE") {
      return res.status(401).json({
        msg: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "An error has ocurred",
    });
  }
};

const validateCollection = (req = request, res = response, next) => {
  const { collection } = req.params;
  mongoose.connection.db.collectionNames(function (err, names) {
    console.log(names);
  });
  next();
};

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Authentication failed",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({
        msg: "Authentication failed",
      });
    }
    if (!user.state) {
      return res.status(401).json({
        msg: "Authentication failed",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "The token is not valid",
    });
  }
};

const validateRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(401).json({
        msg: "Access denied",
      });
    }
    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: "Access denied",
      });
    }
    next();
  };
};

module.exports = {
  handlerErrorResult,
  validateAdminRole,
  validateCollection,
  validateJWT,
  validateRole,
};
