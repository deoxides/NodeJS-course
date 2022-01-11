const {Router} = require('express');
const { check, param } = require('express-validator');
const { handlerErrorResult, validateAdminRole,validateJWT} = require("../middlewares/validation");
const { checkUserIdDB,checkRoleDB, checkEmailDB } = require("../middlewares/validationDB");
const {GetUsuarios,PatchUsuarios,PostUsuarios,PutUsuarios,DeleteUsuarios} = require('../controllers/users.controller');
const router = Router();
//GET
router.get('/',GetUsuarios);
//PATCH
router.patch('/:id',PatchUsuarios);
//POST
router.post('/',[
    validateJWT,
    validateAdminRole,
    check('name','The name is required').not().isEmpty(),
    check('lastName','The lastName is required').not().isEmpty(),
    check('password','The password is too short 6 character min').isLength({min:6}),
    check('email','The email is not valid').isEmail(),
    check('email').custom(checkEmailDB),
    check('role').custom(checkRoleDB),
    handlerErrorResult
],PostUsuarios);
//PUT
router.put('/:id',[
    validateJWT,
    validateAdminRole,
    param('id').isMongoId().bail().custom(checkUserIdDB),
    check('email').isEmail().bail().custom(checkEmailDB),
    check('role').custom(checkRoleDB),

    handlerErrorResult
],PutUsuarios);
//DELETE
router.delete('/:id',[
    validateJWT,
    validateAdminRole,
    param('id').isMongoId().bail().custom(checkUserIdDB),
],DeleteUsuarios);
//OTHERS
router.all('*',function(req,res){
    res.json({
        msg:'404 ~ not found'
    })
})

module.exports = router;