const router = require('express').Router();

const products = require('../../../../db/models/products');

//Validate and edit stock items
router.post('/stock/edititem', (req,response) => {

    if( req.body.name || req.body.price || req.body.outStock) {
        let totalValidation = [];
        let errors = {};

        const nameRegExp = /^(([ ]{1,10})?\w{1,10})( \w{1,10})?( \w{1,10})?( \w{1,10})?([ ]{1,10})?$/;
        const priceRegExp = /^(([ ]{1,10})?[0-9]{1,2})(\.)?([0-9]{1,2})?([ ]{1,10})?$/;
        const typeRegExp = /^(\w{1,10})(\/)?( )?(\w{1,10})?$/;

        // Checks if name,price and stock are in a good format
        if (nameRegExp.test(req.body.name)) {
            totalValidation.push('true');
        } else {
            errors.elementName ='errorNameValidation';
        }
    
        if (priceRegExp.test(req.body.price)) {
            totalValidation.push('true');
        } else {
            errors.elementPrice = 'errorPriceValidation';   
        }  

        if (typeRegExp.test(req.body.type)) {
            totalValidation.push('true');
        } else {
            errors.elementType = 'errorTypeValidation';   
        }  
        
        if (totalValidation.length !== 3) {
            response.json(errors).send();

        } else {   
            //If item edition inputs are good finds if item exists
            products.find({ name: req.body.name })
            .then( result => {
                //If item name exists but its the current one just updates
                if(result.length > 0) {
                    if (result[0].id === req.body.item.id) {
                        products.updateOne({ "name": result[0].name }, {
                            $set: {
                                name: req.body.name,
                                price: req.body.price,
                                outStock: req.body.outStock,
                                type: req.body.type,
                                description: req.body.description
                            }
                        })
                        .then(() => {
                            products.find({})
                            .then(result => {
                                response.json({
                                    updated: 'true',
                                    products: result
                                }).send();
                            })
                        })
                    //If item name already exists but its not the current one returns status
                    } else {
                        response.json({
                            updated: 'false',
                            elmExists: 'true',
                            products: result
                        }).send();
                    }
                    //If the item name is not found in the data base just updates
                } else {
                    products.findById(req.body.item._id)
                    .then( result => {

                        products.updateOne({ name: result.name }, {
                            $set: {
                                name: req.body.name,
                                price: req.body.price,
                                outStock: req.body.outStock,
                                type: req.body.type,
                                description: req.body.description
                            }
                        })
                        .then( (result) => {
                            if (result.nModified === 1) {
                                products.find({})
                                .then(result => {
                                    response.json({
                                        updated: 'true',
                                        products: result
                                    }).send();
                                })
                            }
                        })
                    })
                }
            })
        }       
    }   
})


module.exports = router;