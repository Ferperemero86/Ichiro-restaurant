const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
    {
        total: Number,
        name: String,
        phone: Number,
        price: Number,
        quantity: Number,
        email: String,
        day: String,
        time: String,
        situation: String
    },
)


const Orders =  mongoose.model('Orders', ordersSchema);
   
module.exports = Orders;
