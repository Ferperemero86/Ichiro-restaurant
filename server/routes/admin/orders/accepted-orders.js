const router = require('express').Router();

const acceptedOrders = require('../../../../db/models/accepted-orders');

//Show accepted orders of the day
router.post('/acceptedorders', (req,response) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    const fullDate = `${ year }-${ month }-${ day }`;
    
    //Send current day accepted orders by default
    if (!req.body.date) {
        acceptedOrders.find({ day: fullDate })
        .then(result => {
            response.json(result).send();
        })
    }
    
    //Send accepted orders from the search form date
    if(req.body.date) {
        acceptedOrders.find({ day: req.body.date })
        .then(result => {
            response.json(result).send();
        })
    }
})

module.exports = router;