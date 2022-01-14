const {Router} = require('express');
const { check } = require('express-validator');
const {login, googleSignIn} = require('../controllers/auth.controller');
const { handlerErrorResult } = require('../middlewares/validation');
const route = Router();

route.post('/login',
check('email','The email is required').isEmail(),
check('password','The password is required').not().isEmpty(),
handlerErrorResult
,login);

route.post('/google',
check('id_token','The token is required').not().isEmpty(),
handlerErrorResult
,googleSignIn);

module.exports = route;