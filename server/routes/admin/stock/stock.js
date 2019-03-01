const router = require('express').Router();

const products = require('./../../../../db/models/products');

//Send products by default
router.post('/stock', (req,response) => {
    products.find({})
    .then(result => {
        response.json(result).send();
    })  
})

module.exports = router;