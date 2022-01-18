const {Router} = require('express');
const {check} = require('express-validator');
const { search } = require('../controllers/search.controller');
const { validateCollection } = require('../middlewares/validation');

const router = Router();

router.get('/:collection/:query',[
    check('collection','The collection is required').not().isEmpty().bail().custom(validateCollection)
],search);
//OTHERS
router.all('*',function(req,res){
    res.json({
        msg:'404 ~ not found'
    })
})

module.exports = router;