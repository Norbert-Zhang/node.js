/**
 * Module dependencies.
 */
const express = require('express');

var router = express.Router();

/* api server */
router.get('/', (req, res) => {
    res.send('api server');
});

module.exports = router;
