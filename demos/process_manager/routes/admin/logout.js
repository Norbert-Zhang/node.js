/**
 * Module dependencies.
 */
const express = require('express');

var router = express.Router();

/* logout manage server */
router.get('/', (req, res) => {
    // delete all the data in the session
    req.session.cookie.maxAge = 0; // request.session.destroy();
    // delete the specific data in the session
    //req.session.username = '';
    res.send('loginout...');
});

module.exports = router;
