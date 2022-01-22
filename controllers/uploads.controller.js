const path = require('path');
const fs = require('fs');
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");

const { uploadFile, findFile } = require("../helpers");
const { Product, User } = require("../models");

const getFile = async (req,res = response) =>{
  const {collection,id} = req.params;
  switch (collection) {
    case "products":
      await findFile(Product,id)
            .then((path) => {
              res.sendFile(path)
            })
            .catch((err) => {
              console.log(err)
              const defaultImg = path.join(__dirname,'../assets/no-image.jpg')
              res.status(400).sendFile(defaultImg)
            })
      break;
    case "users":
      await findFile(User,id)
      .then((path) => {
        res.sendFile(path)
      })
      .catch((err) => {
        console.log(err)
        const defaultImg = path.join(__dirname,'../assets/no-image.jpg')
        res.status(400).sendFile(defaultImg)
      })
      break;
    default:
      return res.status(500).json({
        msg: `The collection ${collection} has not been implemented`,
      });
    }
}

const postFile = async (req, res = response) => {
  await uploadFile(req.files, undefined, "")
    .then((result) => res.json({ msg: `The file ${result} was uploaded` }))
    .catch((err) => res.status(400).json({ msg: err }));
};

const putFile = async (req, res = response) => {
  const { collection, id } = req.params;
  let model;
  switch (collection) {
    case "products":
      const product = await Product.findById(id);
      if (!product) {
        return res.status(400).json({
          msg: `The id ${id} has not founded`,
        });
      }
      model = product;
      break;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({
          msg: `The id ${id} has not founded`,
        });
      }
      model = user;
      break;
    default:
      return res.status(500).json({
        msg: `The collection ${collection} has not been implemented`,
      });
  }
  try {
    if(model.img){
      const imgPath = path.join(__dirname,'../uploads',collection,model.img)
      if(fs.existsSync(imgPath)){
        fs.unlinkSync(imgPath);
      }else{
        const [public_id] = model.img.split('/').at(-1).split('.');
        cloudinary.uploader.destroy(public_id)
      }
    }
    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;
    await model.save();
    return res.json({
          msg:'PUT - ALL OK',
          img:model.img
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went worng",
    });
  }
};

module.exports = {
  getFile,
  uploadFile: postFile,
  updateFile: putFile,
};
