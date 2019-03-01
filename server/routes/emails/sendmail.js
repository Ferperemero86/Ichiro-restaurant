const router = require('express').Router();

const Orders = require('./../../../db/models/orders');
const adminUser = require('./../../../db/models/admin-user');

const sgMail = require('@sendgrid/mail');
const emailTemplate = require('../../../src/components/emails/client-order-email');

//Send the Client's order to the restaurant
router.post('/sendmail', (req,response) => {
    if (req.session.cart) {

        if( req.session.cart.length > 0) {

            //If The session cart is greater than 0 proceed to test email and phone data format.
            const mailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const phoneExpression = /^(([ ]{1,5})?[0-9]{11}([ ]{1,5})?)$/;

            //If data format from inputs its ok insert client's order in database and send email to the restaurant.
            if( (req.body.mailValue.match(mailExpression)) && 
                (req.body.phoneValue.match(phoneExpression)) ) {

                if( (req.body.mailValue === req.body.mailValue2) && 
                  (req.body.phoneValue === req.body.phoneValue2) ) {
                    //Get the current day 
                    const date = new Date();
                    
                    let year = date.getFullYear();
                    let month = date.getMonth();
                    let day = date.getDate();
                    let fullDate = `${ year }-${ month }-${ day }`;
                    
                    let hour = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();
                    let fullTime = `${ hour }:${ minutes }:${ seconds }`;
                    
                    req.session.order = req.session.cart;
                    req.session.email = req.body.mailValue;

                    //Insert Client's order in database
                    Orders.collection.insertOne({
                        order: req.session.order,
                        total: req.session.total,
                        email: req.session.email,
                        phone: req.body.phoneValue,
                        day: fullDate,
                        time: fullTime
                    })
                    .then(res => {
                        const idNumber = res.ops[0]._id;
                        const idString = idNumber.toString();
                        //Find client's order data
                        Orders.findById(idString)
                        .then(res => {
                            const ordersArray = JSON.stringify(res);
                            const parseArray = JSON.parse(ordersArray);

                            const emailContent = emailTemplate({
                                order: parseArray.order,
                                total: parseArray.total,
                                orderNumber: parseArray._id,
                                day: parseArray.day,
                                time: parseArray.time
                            });
                
                            //Send email to the restaurant
                            //Find Admin user details to fetch his email
                            adminUser.findById("5c47327679e7651bb7be8ee7")
                            .then(user => {
                                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                                const msg = {
                                    to: user.email,
                                    from: 'Ichiro@order.com',
                                    subject: 'Ichiro Restaurant',
                                    text: 'Ichiro order' ,
                                    html: emailContent
                                };
                                sgMail.send(msg, (err, res) => {
                                    if (err) {
                                        response.json({emailSent: 'false'}).send();
    
                                    } else {
                                        req.session.cart = [];
                                        response.json({emailSent : 'true'}).send();
                                    }
                                })       
                            })                       
                        })    
                    })
                    //Server side input forms Validation 
                } else {
                    if (  (req.body.mailValue !== req.body.mailValue2) && 
                         (req.body.phoneValue !== req.body.phoneValue2) ) {
                        response.json({ emailsMatch: 'false', phonesMatch: 'false', 
                                        emailError: 'false', phoneError: 'false' })
                    }
                    if (  (req.body.mailValue !== req.body.mailValue2) && 
                         (req.body.phoneValue === req.body.phoneValue2) ) {
                        response.json({ emailsMatch: 'false', phonesMatch: 'true', 
                                        emailError: 'false', phoneError: 'false' })
                    }
                    if (  (req.body.mailValue === req.body.mailValue2) && 
                         (req.body.phoneValue !== req.body.phoneValue2) ) {
                        response.json({ emailsMatch: 'true', phonesMatch: 'false', 
                                        emailError: 'false', phoneError: 'false' })
                    }
                }
            } else {
                if ( (!req.body.mailValue.match(mailExpression)) && 
                    (!req.body.phoneValue.match(phoneExpression)) ) {
                    response.json({ emailError: 'true', phoneError: 'true' }).send();
                }
                if ( (!req.body.mailValue.match(mailExpression)) && 
                    (req.body.phoneValue.match(phoneExpression)) ) {
                    response.json({ emailError: 'true', phoneError: 'false' }).send();
                }
                if ( (req.body.mailValue.match(mailExpression)) && 
                    (!req.body.phoneValue.match(phoneExpression)) ) {
                    response.json({ emailError: 'false', phoneError: 'true' }).send();
                }               
            }
        } 
        //If cart is empty tells user to fillup the cart
    } else {
        response.json({ cartEmpty: 'true' }).send();
    }
})

module.exports = router;
