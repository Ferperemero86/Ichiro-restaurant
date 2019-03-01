const router = require('express').Router();

router.post('/header', (req, response) => {
    if(req.session.cart) {
        if(req.session.cart.length > 0) {
            response.json({ cart: req.session.cart  }).send();
        }
    } else {
        response.json({ cart: [] });
    }
   
})

module.exports = router;