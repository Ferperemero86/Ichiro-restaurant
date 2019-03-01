const router = require('express').Router();

const products = require('./../../../../db/models/products');

//Delete item and update products
router.post('/stock/edititem/delete', (req,response) => {
    if (req.body.itemId) {
        const itemId = req.body.itemId.toString();

        products.collection.findOneAndDelete({ id: itemId })
        .then(result => {
            if (result.lastErrorObject.n === 1) {
                products.find({})
                //If succes deletes item and updates products
                .then(updatedProducts => {      
                    response.json({ deleted: 'true',products: updatedProducts }).send();         
                })
            } else {
                //If didnt succed send message
                response.json({ deleted: 'false' }).send();
            }
        })                            
    }       
})

module.exports = router;
