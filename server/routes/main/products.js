const router = require('express').Router();

const products = require('./../../../db/models/products');

//Fetch and display Products from Mongo in Products page  
router.post('/products', (req, response) => {
    products.find({}, (err, items) => {
        let itemsMap = {};
    
        items.forEach((item) => {
          itemsMap[item.name] = item;
        });

        response.send(itemsMap);  
    });
});

module.exports = router;