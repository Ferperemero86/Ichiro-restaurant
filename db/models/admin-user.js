const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
    id: Number,
    secret: String,
    user: String,
    password: String,
    email: String
})

const adminUser = mongoose.model('adminUser', adminUserSchema);
   
module.exports = adminUser;