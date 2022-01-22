const { response, request } = require("express");
const mongoose = require("mongoose");
const { Category, Product, User } = require("../models");

const searchCategories = async (query = "", res = response) => {
  if (mongoose.isValidObjectId(query)) {
    const category = await Category.findById(query);
    return res.json({
      msg: "GET CATEGORIES - All Ok",
      result: category ? category : [],
    });
  } else {
    const regex = new RegExp(query, "i");
    const categories = await Category.find({ name: regex, state: true });
    return res.json({
      msg: "GET  CATEGORIES- All Ok",
      results: categories,
    });
  }
};

const searchProdructs = async (query = "", res = response) => {
  if (mongoose.isValidObjectId(query)) {
    const product = await Product.findById(query)
                    .populate("category", "name");
    return res.json({
      msg: "GET PRODUCTS - All Ok",
      result: product ? product : [],
    });
  } else {
    const regex = new RegExp(query, "i");
    const products = await Product.find({
                        $or: [{ name: regex }, { description: regex }],
                        $and: [{ state: true }],
                        }).populate("category", "name");
    return res.json({
      msg: "GET PRODUCTS - All Ok",
      results: products,
    });
  }
};

const searchUsers = async (query = "", res = response) => {
  if (mongoose.isValidObjectId(query)) {
    const user = await User.findById(query);
    return res.json({
      msg: "GET USERS - All Ok",
      result: user ? user : [],
    });
  } else {
    const regex = new RegExp(query, "i");
    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    });
    return res.json({
      msg: "GET USERS - All Ok",
      results: users,
    });
  }
};

const postSearch = async (req = request, res = response) => {
  const { collection, query } = req.params;
  switch (collection) {
    case "categories":
      searchCategories(query, res);
      break;
    case "products":
      searchProdructs(query, res);
      break;
    case "users":
      searchUsers(query, res);
      break;
    case "roles":
      break;
  }
};

module.exports = {
  search: postSearch,
};
