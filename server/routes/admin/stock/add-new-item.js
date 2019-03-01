const router = require('express').Router();

const products = require('./../../../../db/models/products');

//Validates form and creates a new stock item
router.post('/stock/addnewitem', (req,response) => {
    let totalValidation = [];
    let errors = {};

    const nameRegExp =/^(([ ]{1,10})?\w{1,10})( \w{1,10})?( \w{1,10})?( \w{1,10})?([ ]{1,10})?$/;
    const priceRegExp = /^(([ ]{1,10})?[0-9]{1,2})(\.)?([0-9]{1,2})?([ ]{1,10})?$/;
    const typeRegExp = /^(\w{1,10})(\/)?( )?(\w{1,10})?$/;
    
    //Validates inputs data
    if (nameRegExp.test(req.body.newItemName)) {
        totalValidation.push('true');
    } else {
        errors.newElementName ='errorNameValidation';
    }

    if (priceRegExp.test(req.body.newItemPrice)) {
        totalValidation.push('true');
    } else {
        errors.newElementPrice = 'errorPriceValidation';   
    }  

    if (typeRegExp.test(req.body.newItemType)) {
        totalValidation.push('true');
    } else {
        errors.newElementPrice = 'errorPriceValidation';   
    }  

    if (totalValidation.length !== 3) {
        response.json(errors).send();
    } else {
        //Inserts a new reandom product Id
        if (totalValidation.length === 3) {
            let randomId = Math.floor(Math.random() * (100001 - 1000)) + 1000;

            products.findOne({ id: randomId.toString()})
            //If the Id item exists creates a new one
            .then(result => {  
                if (result !== null && result !== undefined) {
                    randomId = Math.floor(Math.random() * (100001 - 1000)) + 1000;
                }
            })
            //Creates a new item if the name does not exist already
            products.findOne({ name: req.body.newItemName })
            .then(result => {
                if (result === null) {
                    products.collection.insertOne({
                        id: randomId.toString(),
                        name: req.body.newItemName,
                        price: req.body.newItemPrice,
                        type: req.body.newItemType,
                        description: req.body.newItemDesc,
                        outStock: req.body.newOutStock
                    })
                    .then(result  => {
                        //If product is created send message and update products
                       if(result.result.ok === 1) {
                            products.find({})
                                .then((result) => {
                                    response.json({
                                        newElementAdded: 'true',
                                        products: result
                                }).send()     
                            })    
                        } 
                    })
                    .catch(err => {
                        products.find({})
                        .then((result) => {
                            response.json({
                                newElementAdded: 'error',
                                products: result
                            }).send()     
                        })    
                    })
                } else {
                    //If the item exist sends a meesage
                    response.json({ elmExists : 'true' })
                }
            })              
        }
    }
})

module.exports = router;
