/**
 * Module dependencies.
 */
const express = require('express');
const user = require('./admin/user');
const login = require('./admin/login');
const logout = require('./admin/logout');
const nav = require('./admin/nav');

var router = express.Router();

/* back end server */
router.get('/', (req, res) => {
    res.send('back end server');
});

router.use('/user', user);
router.use('/login', login);
router.use('/logout', logout);
router.use('/nav', nav);

module.exports = router;
