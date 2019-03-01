const router = require('express').Router();

const Orders = require('./../../../../db/models/orders');
const rejectedOrders = require('./../../../../db/models/rejected-orders');
const rejectedOrderEmailTemplate = require('./../../../../src/components/emails/rejected-order-email');

const sgMail = require('@sendgrid/mail');

//Insert the rejected Orders in database in the current day
//Deletes pending Order in databae
router.post('/rejectedorder',(req,response) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let fullDate = `${ year }-${ month }-${ day }`;
    
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let fullTime = `${ hour }:${ minutes }`;

    rejectedOrders.collection.insertOne({
        id: req.body.rejectedOrder._id,
        order: req.body.rejectedOrder.order,
        total: req.body.rejectedOrder.total,
        phone: req.body.rejectedOrder.phone,
        email: req.body.rejectedOrder.email,
        day: fullDate,
        time: fullTime
    })
    .then(res => {
        Orders.deleteOne( { _id: req.body.rejectedOrder._id} )
        .then(res => {
            const emailContent = rejectedOrderEmailTemplate({
                order: req.body.rejectedOrder.order,
                total: req.body.rejectedOrder.total,
                orderNumber: req.body.rejectedOrder._id,
                day: req.body.rejectedOrder.day,
                time: req.body.rejectedOrder.time
            });
            //Sends email to the client
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: req.body.rejectedOrder.email,
                from: 'ichiro@order.com',
                subject: 'Ichiro Restaurant',
                text: 'Ichiro order' ,
                html: emailContent
            };
            sgMail.send(msg, (err, res) => {
                if (err) {
                   return response.json('false').send();
                } else {
                   return response.json('true').send();
                }
            })
        
        })
    })
    .catch(res=> {
        res.send(`<h1>Something went wrong and the Order could not be Rejected.
                  Please call the Developer to fix this problem.Thanks</h1>`);
    })
})

module.exports = router;

