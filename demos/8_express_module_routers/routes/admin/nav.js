/* navigation manage server */
const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('navigation list...');
});

router.get('/add', (req, res) => {
    res.send('add navigation...');
});

router.get('/edit', (req, res) => {
    res.send('edit navigation...');
});

router.post('/doAdd', (req, res) => {
    res.send('do add navigation...');
});

router.post('/doEdit', (req, res) => {
    res.send('do edit navigation...');
});

module.exports = router;
