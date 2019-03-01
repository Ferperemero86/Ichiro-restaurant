const router = require('express').Router();

router.post('/reviewitems', (req,response) => {

    if (req.session.cart) {
        //if Cart items is at least 1 proceed with checkout
        if (req.session.cart.length > 0) {
            response.json({ cart: req.session.cart, total: req.session.total }).send();
        }
    }
})

module.exports = router;