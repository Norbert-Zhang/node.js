/**
 * Module dependencies.
 */
const express = require('express');
const tools = require('../../modules/common/tools');

var router = express.Router();

/* navigation manage server */
router.get('/', (req, res) => {
    res.send('navigation list...');
});

router.get('/add', (req, res) => {
    res.render('admin/nav/add');
});

router.get('/edit', (req, res) => {
    res.send('edit navigation...');
});

// var cpUpload = tools.multer().single('file'); // single file update!!!
var cpUpload = tools.multer().array('file', 200); // multiple files update with the same field!!!
//var cpUpload = tools.multer().fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 8 }]); // multiple files update with the different fields!!!
router.post('/doAdd', cpUpload, (req, res) => {
    var body = req.body ? req.body : {};
    var file = req.file ? req.file : {};
    var files = req.files ? req.files : {};
    res.send({ body: body, file: file, files: files });
});

router.post('/doEdit', (req, res) => {
    res.send('do edit navigation...');
});

module.exports = router;
