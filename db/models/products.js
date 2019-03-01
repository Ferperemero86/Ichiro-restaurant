const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = Schema({
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    type: String,
    description: String,
    available: String,
    outStock: String
});

const Products =  mongoose.model('Products', productsSchema);
   
module.exports = Products;
