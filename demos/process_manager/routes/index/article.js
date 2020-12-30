/**
 * Module dependencies.
 */
const express = require('express');

var router = express.Router();

/* article manage server */
router.get('/', (req, res) => {
    res.send('article list...');
});

router.get('/add', (req, res) => {
    res.send('add article...');
});

router.get('/edit', (req, res) => {
    res.send('edit article...');
});

router.post('/doAdd', (req, res) => {
    res.send('do add article...');
});

router.post('/doEdit', (req, res) => {
    res.send('do edit article...');
});

module.exports = router;
