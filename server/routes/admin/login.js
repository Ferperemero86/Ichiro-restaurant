const router = require('express').Router();
const adminUser = require('./../../../db/models/admin-user');
const bcrypt = require('bcrypt');

//Handles the login form to authenticate the Admin user using HOC.
router.post('/login', (req,response) => {
    //If the user is not logged in send a false login status 
    if (!req.session.adminUser) {
        const myPlaintextPassword = req.body.password;
            
            if (req.body.user && req.body.password) {
                // Checks if user exits and if does compare passwords using bcrypt
                adminUser.findOne({ user: req.body.user })
                .then( result => {
                    if (result !== null) {
                        bcrypt.compare(myPlaintextPassword, result.password, (err, res) => {
                            if (res === true) {
                                req.session.adminUser = 'true';
                                req.session.adminUserName = req.body.user;
                                response.json(req.session.adminUser).send();
                            } else {
                                response.json('false').send();
                            }
                        })                       
                    } else {
                        response.json('false').send();
                    }     
                })        
            }
    }

    //If Login is success send Login status 
    if (req.session.adminUser === 'true') {
        response.json('true').send();
    }
        
})

module.exports = router;