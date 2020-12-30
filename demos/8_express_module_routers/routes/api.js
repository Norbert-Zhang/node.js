/* api server */
const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('api server');
});

module.exports = router;
