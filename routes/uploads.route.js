const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateFile, getFile } = require("../controllers");
const {
  validateCollections,
  handlerErrorResult,
  validateFiles,
} = require("../middlewares/validation");
const { checkCollectionDB } = require("../middlewares/validationDB");

const router = Router();

router.get("/:collection/:id", [
    check('collection')
        .custom(checkCollectionDB)
        .bail()
        .custom((c) => validateCollections(c,['users','products'])),
    check('id','The id is not a valid mongo id').isMongoId(),
    handlerErrorResult],
    getFile);

router.post("/", [validateFiles, handlerErrorResult], uploadFile);

router.put(
  "/:collection/:id",
  [
    check("collection")
      .custom(checkCollectionDB)
      .bail()
      .custom((c) => validateCollections(c, ["users", "products"])),
    check("id", "The id is not a valid mongo id").isMongoId(),
    validateFiles,
    handlerErrorResult,
  ],
  updateFile
);

module.exports = router;
