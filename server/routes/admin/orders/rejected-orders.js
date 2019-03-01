const router = require('express').Router();

const rejectedOrders = require('../../../../db/models/rejected-orders');

//Show rejected orders of the day
router.post('/rejectedorders', (req,response) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    const fullDate = `${ year }-${ month }-${ day }`;
    
    //Send current day rejected orders by default
    if (!req.body.date) {
        rejectedOrders.find({ day: fullDate })
        .then(result => {
            response.json(result).send();
        })
    }
    
    //Send rejected orders from the search form date
    if(req.body.date) {
        rejectedOrders.find({ day: req.body.date })
        .then(result => {
            response.json(result).send();
        })
    }
})

module.exports = router;
