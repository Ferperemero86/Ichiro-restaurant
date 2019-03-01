const router = require('express').Router();

//If uadmin user logs out remove session data.
router.post('/logout', (req,response) => {
    if (req.body.logout === 'true') {
        req.session.destroy();
        response.json('true').send();
    }
})

module.exports = router;