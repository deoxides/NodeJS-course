const {Router} = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth.controller');
const { handlerErrorResult } = require('../middlewares/validation');
const route = Router();

route.post('/login',
check('email','The email is required').isEmail(),
check('password','The password is required').not().isEmpty(),
handlerErrorResult
,login);

module.exports = route;