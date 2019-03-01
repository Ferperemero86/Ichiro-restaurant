const router = require('express').Router();
const Orders = require('../../../../db/models/orders');

router.post('/pendingOrders', (req, response) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let fullDate = `${ year }-${ month }-${ day  }`;

    Orders.find({ day: fullDate })
    .then(items => {
        if (items.length > 0) {
            response.send(items);  
        } else {
            response.json({ itemsPending: 'false' }).send();
        }  
    })     
});

module.exports = router;