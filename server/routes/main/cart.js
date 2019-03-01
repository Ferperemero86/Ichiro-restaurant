
const router = require('express').Router();

//Manage cart Items
router.post('/cart', (req, response) => {

    if (!req.session.cart) {
        req.session.cart = [];
        req.session.total = 0;
    } 

    if (req.session.cart) {
        if (req.body.addItem) {
            let index = req.session.cart.findIndex(i => i.id === req.body.addItem.id);

            if (!req.session.cart[index]) {
                req.session.cart.push(req.body.addItem);
                
                let index = req.session.cart.findIndex(i => i.id === req.body.addItem.id)   

                req.session.cart[index].quantity = 1;
                req.session.total += req.session.cart[index].price;            
            } else {
                let index = req.session.cart.findIndex(i => i.id === req.body.addItem.id);

                req.session.cart[index].quantity++;
                req.session.total += req.session.cart[index].price;    
            } 
        }

        if (req.body.removeItem) {
            let index = req.session.cart.findIndex(i => i.id === req.body.removeItem.id);

            if (req.session.cart[index] && req.session.cart[index].quantity !== 0) {
                req.session.cart[index].quantity--;
                req.session.total -= req.session.cart[index].price;    
            } if (req.session.cart[index] && req.session.cart[index].quantity === 0) {
                req.session.cart.splice(index,1);
            }     
        }

        if (req.body.removeAllItems) {
            let index = req.session.cart.findIndex(i => i.id === req.body.removeAllItems.id);
            
            if (req.session.cart[index] && req.session.cart[index].quantity !== 0) {
                req.session.total -= (req.session.cart[index].price * req.session.cart[index].quantity);  
                req.session.cart.splice(index,1);
            }
        }

        if (req.session.cart.length === 0) {
            req.session.total = 0;
        }
        
        response.json({ cart: req.session.cart, totalPrice: req.session.total }).send();

    }//End req.session IF
});

module.exports = router;