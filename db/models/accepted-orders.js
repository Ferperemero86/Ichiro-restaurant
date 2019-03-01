const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acceptedOrdersSchema = new Schema(
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

const acceptedOrders = mongoose.model('acceptedOrders', acceptedOrdersSchema);

module.exports = acceptedOrders
;