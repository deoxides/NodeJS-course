const {Router} = require('express');
const {check} = require('express-validator');
const { search } = require('../controllers/search.controller');
const { handlerErrorResult, validateCollections } = require('../middlewares/validation');
const { checkCollectionDB } = require('../middlewares/validationDB');

const router = Router();

router.get('/:collection/:query',[
    check('collection','The collection is required').not().isEmpty(),
    check('collection').custom(checkCollectionDB),
    check('collection').custom(c=> validateCollections(c,['users','products','categories'])),
    handlerErrorResult
],search);
//OTHERS
router.all('*',function(req,res){
    res.json({
        msg:'404 ~ not found'
    })
})

module.exports = router;