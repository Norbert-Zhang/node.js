/* login manage server */
const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('login page ...');
});

router.post('/doLogin', (req, res) => {
    res.send('validate login...');
});

module.exports = router;
