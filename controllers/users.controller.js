const { response, request } = require("express");
const {User} = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

const GetUsuarios = async (req, res = response) => {
  const query = { state: true };
  const { limit = 5, from = 0 } = req.query;
  const [total, users] = await Promise.all([
    User.find(query).skip(Number(from)).limit(Number(limit)),
    User.countDocuments(query),
  ]);
  res.status(200).json({
    total,
    users,
  });
  res.end();
};

const PatchUsuarios = (req, res = response) => {
  res.status(200).json({
    msg: "PATCH - All OK",
  });
  res.end();
};

const PostUsuarios = async (req = request, res = response) => {
  const { name, lastName, email, password, role } = req.body;
  const user = new User({ name, lastName, email, password, role });
  user.password = hashPassword(password);
  await user.save();
  res.status(201).json({
    msg: "POST - All OK",
    user,
  });
  res.end();
};

const PutUsuarios = async (req = request, res = response) => {
  const { id } = req.params;
  const { google, password, ...fields } = req.body;
  if (password) {
    fields.password = hashPassword(password);
  }
  const user = await User.findByIdAndUpdate(id, fields);
  res.status(200).json({
    msg: "PUT - All OK",
    user,
  });
  res.end();
};

const DeleteUsuarios = async(req, res = response) => {
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id,{state:false});
  res.status(200).json({
    msg: "DELETE - All OK",
    user,
    deletedBy:req.user.name
  });
  res.end();
};

module.exports = {
  GetUsuarios,
  PatchUsuarios,
  PostUsuarios,
  PutUsuarios,
  DeleteUsuarios,
};
