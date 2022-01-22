const { response, request } = require("express");
const { Product, Category } = require("../models");

const getProducts = async (req, res = response) => {
  try {
    const query = { state: true };
    const { limit = 5, from = 0 } = req.query;
    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .populate("user",'name')
        .populate("category",'name'),
      Product.countDocuments(query),
    ]);
    res.json({
      msg: "GET - All Ok",
      products,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something goes wrong",
    });
  }
};
const getProductById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
                                  .populate('users','name')
                                  .populate('category','name');
    if (!product) {
      return res.status(400).json({
        msg: "Product not found",
      });
    }
    res.json({
      msg: "GET - All Ok",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Something goes wrong",
    });
  }
};
const postProduct = async (req = request, res = response) => {
  const { name, price, description, available } = req.body;
  const categoryId = req.body.category;
  const user = req.user;
  try {
    const product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({
        msg: `The product ${name} is already exists`,
      });
    }
    const category = await Category.findOne({ categoryId });
    if (!category) {
      return res.status(400).json({
        msg: `The category ${category.name} does not exist`,
      });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      available,
      category,
      user,
    });
    await newProduct.save();
    res.status(201).json({
      msg: "POST - All Ok",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something goes wrong",
    });
  }
};
const putProduct = async (req, res = response) => {
  const { id } = req.params;
  const { name,price,description,available,category } = req.body;
  const user = req.user;
  try {
    const product = await Product.findByIdAndUpdate(id, { name,price,description,available,category, user });
    res.json({
      msg: " PUT - All Ok",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something goes wrong",
    });
  }
};
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const product = await Product.findByIdAndUpdate(id, { state: false, user });
    res.json({
      msg: "DELETE - All Ok",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something goes wrong",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  postProduct,
  putProduct,
};
