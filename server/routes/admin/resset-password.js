const router = require('express').Router();

const adminUser = require('./../../../db/models/admin-user');

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

//Checks if the tokenlink is valid
router.post('/ressetpassword', (req,response) => {
    if(!req.body.userPassword) {
        const secret = req.body.secret;
        const payload = jwt.decode(req.body.token,secret);
        //If id provided in token doesnt match any user sends a error 
        //and the site redirects to an Error page
        adminUser.find({ secret: payload.secret })
        .then(result => {
            if (result.length === 0) {
                response.json({ signatureError: 'true' });
            } else {
                response.json({ adminUserName: result[0].user })
            }
        })
    } 
    //If the new password is sent in validate format, finds user and updates password
    if (req.body.userPassword) {
        const secret = req.body.secret;
        const payload = jwt.decode(req.body.token,secret);
       
        const passRegExp = /^\w{8,12}$/;
        const passValue = req.body.userPassword
        //Validates password format
        if (passRegExp.test(passValue)) {
            try {
                //Finds user using the id from the token's payload
                adminUser.find({ secret: payload.secret })
                .then(result => {
                    //If user found updates password
                    if (result.length === 1) {
                        const saltRounds = 10;
                        const myPlaintextPassword = req.body.userPassword;
                        let random = Math.floor(Math.random() * (100001 - 1000)) + 1000;
    
                        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                            adminUser.updateOne({ secret: payload.secret}, {
                                $set : { password: hash , secret: random.toString() } 
                            })
                            .then((res) => {
                                if (res.nModified === 0) {
                                    response.json({passUpdated: 'false'});
                                } else {
                                    response.json({passUpdated: 'true'});     
                                } 
                            })
                        })
                    } else {
                        //If user not found invalidates token and sends error
                        response.json({ signatureError: 'true' });
                    }
                })
            } catch (err) {
                //If jwt signature error happens, sends an error
                response.json({signatureError: 'true'});
            }
            
        } else {
                //If password data format is wrong sends a message
                response.json({passNotValid: 'true'});
        }
    }  
    
})


module.exports = router;
