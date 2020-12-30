/* user manage server */
const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('user list...');
});

router.get('/add', (req, res) => {
    res.send('add user...');
});

router.get('/edit', (req, res) => {
    res.send('edit user...');
});

router.post('/doAdd', (req, res) => {
    res.send('do add user...');
});

router.post('/doEdit', (req, res) => {
    res.send('do edit user...');
});

module.exports = router;
