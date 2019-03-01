const router = require('express').Router();
const adminUser = require('./../../../db/models/admin-user');

//Validates Admin profile inputs and edits data
router.post('/adminprofile', (req,response) => {
    //Send form by default to edit content
    if(!req.body.userField) {
        adminUser.find({ user: req.session.adminUserName })
            .then(result => {
                response.json(result).send();
            })
    } else {
        //If new data sents validate input
        const nameRegExp = /^([ ]{1,5})?\w{2,10}([ ]{1,5})?$/;
        const emailRegExp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passRegExp = /^\w{8,12}$/;
        
        //If the input is the user's name validate data and update
        if(req.body.userField === "user") {
            const name = req.body.userDetail;

            //validates name data
            if (nameRegExp.test(name)) {
                //If data format is good updates username
                adminUser.find({ user: req.session.adminUserName })
                .then(result => {    
                    adminUser.updateOne({user: req.session.adminUserName}, {
                         $set : { user: req.body.userDetail } 
                    })
                    .then((res) => {
                        //If is not updated send message
                        if (res.nModified === 0) {
                                response.json({ elementUpdated: "userNotUpdated" }).send();
                        } else {
                            //User updated. Send meesage
                            req.session.adminUserName = req.body.userDetail;

                            adminUser.find({ user: req.session.adminUserName })
                            .then(details => {
                                response.json({ elementUpdated: "userUpdated", details }).send();
                            })              
                        }
                    })        
                })
            } else {
                //Username could not be validated
                response.json({ userError: 'true' }).send();
            }
        }
        if(req.body.userField === "email") {
            const email = req.body.userDetail;

            if (emailRegExp.test(email)) {
                adminUser.find({ email })
                .then(result => {  
                    if (result.length === 0) {
                        adminUser.updateOne({ user: req.session.adminUserName }, {
                            $set : { email: req.body.userDetail } 
                        })
                        .then((res) => {
                            if (res.nModified === 0) {
                                    response.json({ elementUpdated: "emailNotUpdated" }).send();
                            } else {
                                req.session.adminUserEmail = req.body.userEmail;
                                
                                adminUser.find({ user: req.session.adminUserName })
                                .then(details => {
                                    response.json({ elementUpdated: "emailUpdated", details }).send();
                                })              
                            }
                        })    
                    } else {
                        response.json({ emailExists: 'true' }).send();
                    }       
                })
            } else {
                response.json({ emailError: 'true' }).send();
            }
        }
         //Same as username and insert password data using bcrypt
        if(req.body.userField === "password") {
            const password = req.body.userDetail;

            if (passRegExp.test(password)) {
                adminUser.find({ user: req.session.adminUserName })
                .then(result => {      
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                const myPlaintextPassword = req.body.userDetail;

                bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                    adminUser.updateOne({ user: req.session.adminUserName }, {
                        $set : { "password": hash } 
                    })
                    .then((res) => {
                        if (res.nModified === 0) {
                                response.json({ elementUpdated: "passwordNotUpdated" }).send();
                        } else {
                            req.session.adminUserEmail = req.body.userPassword;
                            adminUser.find({ user: req.session.adminUserName })
                            .then(details => {
                                response.json({ elementUpdated: "passwordUpdated",details }).send();
                            })              
                        }
                    })            
      
                });    
            })

            } else {
                response.json({ passwordError: 'true' }).send();
            }
        }
    }
}) 


module.exports = router;