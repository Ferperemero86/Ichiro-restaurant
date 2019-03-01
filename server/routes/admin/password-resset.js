const router = require('express').Router();
const adminUser = require('./../../../db/models/admin-user');
const passRessetEmailTemplate = require('./../../../src/components/emails/pass-resset-email');

const jwt = require('jwt-simple');
const sgMail = require('@sendgrid/mail');

//If the email address sent exists sends a recovery Email with token
router.post('/passwordresset', (req,response) => {
    if (req.body.recoveryMail) {
        adminUser.find({ email: req.body.recoveryMail })
        .then(result => {
            if( result.length === 1) {
                const payload = {
                    secret: result[0].secret,
                    email: result.email
                }
                //Creates a unique tokenlink
                const secret = result[0].secret;
                const token = jwt.encode(payload, secret);
                const link =  payload.secret+ '/' + token;
                const emailContent = passRessetEmailTemplate ({
                    recoveryLink : link
                }) 
                //Sends the email with the toquen
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: req.body.recoveryMail,
                    from: 'Ichiro@order.com',
                    subject: 'Ichiro password Recovery',
                    text: 'Ichiro order' ,
                    html: emailContent
                };
                sgMail.send(msg, (err, res) => {
                    if (err) {
                       return response.json({ emailSent: 'false' }).send();
                    } else {
                       return response.json({ emailSent: 'true' }).send();
                    }
                })
            } else {
                //If email exists sends message
                response.json({ emailExists: 'false' }).send();
            }
        })
    } else {
        //If email format is valid sends message
        response.json({ validEmail: 'false' }).send()
    }
})

module.exports = router;