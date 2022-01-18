const { Router } = require("express");
const { check } = require("express-validator");
const {
  handlerErrorResult,
  validateAdminRole,
  validateJWT,
} = require("../middlewares/validation");
const {
  getProducts,
  getProductById,
  deleteProduct,
  postProduct,
  putProduct,
} = require("../controllers/products.controller");
const { checkProductIdDB, checkCategoryIdDB } = require("../middlewares/validationDB");

const router = Router();
//GET
router.get("/", getProducts);
//GET by id
router.get(
  "/:id",
  [
    check("id", "The id is not a valid Mongo id").isMongoId(),
    handlerErrorResult,
  ],
  getProductById
);
//POST
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check('category',"The id of category is not a valid Mongo id").isMongoId().bail().custom(checkCategoryIdDB),
    handlerErrorResult,
  ],
  postProduct
);
//PUT
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "The id is not a valid Mongo id")
      .isMongoId()
      .bail()
      .custom(checkProductIdDB),
    check("name", "The name is required").not().isEmpty(),
    handlerErrorResult,
  ],
  putProduct
);
//DELETE
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRole,
    check("id", "The id is not a valid Mongo id")
      .isMongoId()
      .bail()
      .custom(checkProductIdDB),
    handlerErrorResult,
  ],
  deleteProduct
);
//OTHERS
router.all("*", function (req, res) {
  res.json({
    msg: "404 ~ not found",
  });
});

module.exports = router;
