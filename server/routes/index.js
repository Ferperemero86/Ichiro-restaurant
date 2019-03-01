const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//Main routes modules
const products = require('./main/products');
const cart = require('./main/cart');
const reviewItems = require('./main/review-items');
const header = require('./main/header');

//Email routes modules
const sendMail = require('./emails/sendmail');

//Admin routes modules
const login = require('./admin/login');
const logout = require('./admin/logout');
const adminProfile = require('./admin/admin-profile');
const stock = require('./admin/stock/stock');
const stockEditItem = require('./admin/stock/edit-item');
const stockEditItemDelete = require('./admin/stock/edit-item-delete');
const stockAddNewItem = require('./admin/stock/add-new-item');
const passwordResset = require('./admin/password-resset');
const ressetPassword = require('./admin/resset-password');

//Admin/orders routes modules
const newOrders = require('./admin/orders/new-orders');
const pendingOrders = require('./admin/orders/pending-orders');
const acceptedOrder = require('./admin/orders/accepted-order');
const rejectedOrders = require('./admin/orders/rejected-orders');
const acceptedOrders = require('./admin/orders/accepted-orders');
const rejectedOrder = require('./admin/orders/rejected-order');

const router = require('express').Router();

mongoose.connect(process.env.MONGODB_URI);

//bodyparser Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


//Express-sessions Middleware
router.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    name: String
});

const Session = mongoose.model('Sessions', SomeModelSchema);

//Save sessions in MongoStore
newSession = Session ({
    name: 'session'
});

newSession.save((err) => {
    if (!err) {
        console.log('model created')
    } else {
        console.log('error');
    }
})

var store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});
   
// Catch errors
store.on('error', (error) => {
    assert.ifError(error);
    assert.ok(false);
});

//Middlewares

//admin
router.use('/', login);
router.use('/', logout);
router.use('/', passwordResset);
router.use('/', ressetPassword);
router.use('/', adminProfile);

//main
router.use('/', products); 
router.use('/', cart);
router.use('/', reviewItems);
router.use('/', sendMail);
router.use('/', header);

//admin/stock
router.use('/', stock);
router.use('/', stockEditItem);
router.use('/', stockEditItemDelete);
router.use('/', stockAddNewItem);

//admin/orders
router.use('/', newOrders);
router.use('/', pendingOrders);
router.use('/', acceptedOrder);
router.use('/', acceptedOrders);
router.use('/', rejectedOrder);
router.use('/', rejectedOrder);
router.use('/', rejectedOrders);


module.exports = router;