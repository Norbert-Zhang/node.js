/**
 * Module dependencies.
 */
const express = require('express');
const article = require('./index/article');
const news = require('./index/news');

var router = express.Router();

/* front end server */
router.get('/', (req, res) => {
    res.send('...');
});

router.use('/article', article);
router.use('/news', news);

module.exports = router;
