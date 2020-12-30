/* back end server */
const express = require('express');
const user = require('./admin/user');
const login = require('./admin/login');
const nav = require('./admin/nav');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('back end server');
});

router.use('/user', user);
router.use('/login', login);
router.use('/nav', nav);

module.exports = router;
