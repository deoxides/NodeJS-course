const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { Model } = require("mongoose");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const defaultExtensions = ["gif", "jpg", "jpeg", "png"];

const findFile = (model = Model, id = "") => {
  return new Promise(async (resolve, reject) => {
    const modelExists = await model.findById(id);
    if (!modelExists) {
      throw reject(`The id ${id} was not found`);
    }
    if (modelExists.img) {
      const imgPath = path.join(
        __dirname,
        "../uploads",
        model.collection.collectionName,
        modelExists.img
      );
      if (!fs.existsSync(imgPath)) {
        reject(
          `Cannot find the img ${modelExists.img} in the collection ${model.collection.collectionName}`
        );
      } else {
        resolve(imgPath);
      }
    } else {
      reject(`The object with id ${id} does not have an img`);
    }
  });
};

const uploadFile = (files, extensions = defaultExtensions, folder = "", local = false) => {
  return new Promise(async (resolve, reject) => {
    const { file } = files;
    const extension = validateExtension(file.name, extensions, (err) => {
      if (err) {
        throw reject(err);
      }
    });
    const fileName = uuidv4() + "." + extension;
    if (local) {
      const uploadPath = path.join(__dirname, "../uploads/", folder, fileName);
      file.mv(uploadPath, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
      resolve(uploadPath);
    } else {
      await cloudinary.uploader.upload(file.tempFilePath)
      .then(path => resolve(path))
      .catch(error => { 
        console.log(error);
        reject(error)
      });
    }
  });
};

const validateExtension = (
  fileName = "",
  extensions = defaultExtensions,
  callback
) => {
  const fileExtension = fileName.split(".");
  if (!extensions.includes(fileExtension[fileExtension.length -1])) {
    callback(`The extension ${fileExtension} is not allowed`);
  } else {
    return fileExtension;
  }
};

module.exports = {
  findFile,
  uploadFile,
};
