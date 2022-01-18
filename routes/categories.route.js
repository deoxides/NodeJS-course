const { Router } = require("express");
const { check } = require("express-validator");
const {
  handlerErrorResult,
  validateAdminRole,
  validateJWT,
} = require("../middlewares/validation");
const {
  getCategories,
  getCategoryById,
  deleteCategory,
  postCategory,
  putCategory,
} = require("../controllers/categories.controller");
const { checkCategoryIdDB } = require("../middlewares/validationDB");

const router = Router();
//GET
router.get("/", getCategories);
//GET by id
router.get(
  "/:id",
  [
    check("id", "The id is required").not().isEmpty().bail().isMongoId(),
    handlerErrorResult,
  ],
  getCategoryById
);
//POST
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    handlerErrorResult,
  ],
  postCategory
);
//PUT
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "The id is not a valid mongo id")
      .isMongoId()
      .bail()
      .custom(checkCategoryIdDB),
    check("name", "The name is required").not().isEmpty(),
    handlerErrorResult,
  ],
  putCategory
);
//DELETE
router.delete("/:id",[
    validateJWT,
    validateAdminRole,
    check('id','The id is not a valid mongo id').isMongoId().bail().custom(checkCategoryIdDB),
    handlerErrorResult
],
 deleteCategory);
//OTHERS
router.all("*", function (req, res) {
  res.json({
    msg: "404 ~ not found",
  });
});

module.exports = router;
