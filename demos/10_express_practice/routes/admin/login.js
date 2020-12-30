/**
 * Module dependencies.
 */
const express = require('express');

var router = express.Router();

/* login manage server */
router.get('/', (req, res) => {
    //console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);
    // If possible, get the user name from the cookie!!!
    //var username = req.cookies.username ? req.cookies.username : ''; // get the normal cookies
    var username = req.signedCookies.username ? req.signedCookies.username : ''; // get the signed cookies
    res.render("admin/login/login.html", { username: username });
});

router.post('/doLogin', (req, res) => {
    if (req.body.username) {
        // If possible, write the user name in the cookie!!!
        res.cookie("username", req.body.username, { maxAge: 1000 * 60 * 60, domain: ".devfree.com", signed: true });
        req.session.username = req.body.username;
    }
    console.log(req.body);
    //res.send(req.body);
    res.redirect('/news');
});

module.exports = router;
