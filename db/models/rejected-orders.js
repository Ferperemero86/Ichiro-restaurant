const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rejectedOrdersSchema = new Schema(
    {
        total: Number,
        name: String,
        price: Number,
        quantity: Number,
        email: String,
        day: String,
        time: String,
        situation: String
    }
)

const rejectedOrders = mongoose.model('rejectedOrders', rejectedOrdersSchema);

module.exports = rejectedOrders;