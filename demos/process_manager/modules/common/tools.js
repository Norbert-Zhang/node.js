/**
 * Module dependencies.
 */
const multer = require('multer');
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');

/* tools: upload files, md5 ... */
let tools = {
    multer() {
        var storage = multer.diskStorage({
            destination: async function (req, file, cb) {
                // get the date "20201227"
                let day = sd.format(new Date(), 'YYYYMMDD');
                // get the new directory
                let dir = path.join('public/_update/', day);
                // create the new directory!!!
                await mkdirp(dir);
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                let extname = path.extname(file.originalname);
                cb(null, file.fieldname + '-' + Date.now() + extname);
            }
        });
        var upload = multer({ storage: storage });
        return upload;
    },
    // md5(){
    //     // ......
    // }
};

module.exports = tools;