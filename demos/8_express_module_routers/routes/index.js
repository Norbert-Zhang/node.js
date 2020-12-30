/* front end server */
const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.send('...');
});

module.exports = router;
