/**
 * Module dependencies.
 */
const express = require('express');

var router = express.Router();

/* news manage server */
router.get('/', (req, res) => {
    // show/resolve html string!!!
    let msg = '<h3>News list:</h3>';
    let list = [{ title: 'news 1' }, { title: 'news 2' }, { title: 'news 3' }];
    let footer = '<div>views: ' + req.session.views[req.originalUrl] + '</div>' + '<div>expires in: ' + parseInt(req.session.cookie.maxAge / 1000 / 60) + ' minutes</div>';
    res.render("index/news/news.html", { msg: msg, list: list, footer: footer });
});

module.exports = router;
