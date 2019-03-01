const router = require('express').Router();
const Orders = require('../../../../db/models/orders');

//Gets the orders Pending in the current day
router.post('/neworders', (req,response) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let fullDate = `${ year }-${ month }-${ day }`;
    
    Orders.find({ day: fullDate })
    .then(items => {
        response.json(items.length).send(); 
    }) 
})

module.exports = router;