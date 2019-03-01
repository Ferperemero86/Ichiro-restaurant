const router = require('express').Router();

const Orders = require('./../../../../db/models/orders');
const acceptedOrderEmailTemplate = require('./../../../../src/components/emails/accepted-order-email');
const acceptedOrders = require('./../../../../db/models/accepted-orders');

const sgMail = require('@sendgrid/mail');

router.post('/acceptedorder', (req,response) => { 
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let fullDate = `${ year }-${ month }-${ day }`;
    
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let fullTime = `${ hour }:${ minutes }`;

    acceptedOrders.collection.insertOne({   
        _id: req.body.acceptedOrder._id,
        order: req.body.acceptedOrder.order,
        total: req.body.acceptedOrder.total,
        phone: req.body.acceptedOrder.phone,
        email: req.body.acceptedOrder.email,
        day: fullDate,
        time: fullTime         
    })
    .then(res => {
        //Delete the pending order in database
        Orders.deleteOne( { _id: req.body.acceptedOrder._id } )
        .then(res => {
            const emailContent = acceptedOrderEmailTemplate({
                order : req.body.acceptedOrder.order,
                total: req.body.acceptedOrder.total,
                orderNumber: req.body.acceptedOrder._id,
                day: req.body.acceptedOrder.day,
                time: req.body.acceptedOrder.time
            });
            //Sends email to the client
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: req.body.acceptedOrder.email,
                from: 'ichiro@order.com',
                subject: 'Ichiro Restaurant',
                text: 'Ichiro order' ,
                html: emailContent
            };
            sgMail.send(msg, (err, res) => {
                if (err) {
                   response.json('false').send();
                } else {
                   response.json('true').send();
                }
            })
        
        })
    })
    .catch(res=> {
        res.send(`<h1>Something went wrong and the Order could not be accepted.
                  Please call the Developer to fix this problem.Thanks</h1>`);
    })
})

module.exports = router;