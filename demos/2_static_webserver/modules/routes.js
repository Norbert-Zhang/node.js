
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime.json');//list of file extensions with mime types: https://github.com/micnic/mime.json

exports.static = function(request, response, staticPath) {
    // 1. get the url (path name)
    let pathName = url.parse(request.url).pathname;
    // If needed, navigate to the root 'index.html'
    pathName = pathName == '/' ? '/index.html' : pathName;
    if (pathName != '/favicon.ico') {
        // 2. get the static file path
        let filePath = './' + staticPath + pathName;
        console.log(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8' });
                response.end('404: This Page does not exist...');
            } else {
                let extname = path.extname(pathName).replace('.', '');
                let contentType = mime[extname];
                if(!contentType) contentType = 'text/html';
                // text/html;charset="utf-8;application/json
                response.writeHead(200, { 'Content-Type': contentType + ';charset="utf-8' });
                response.write(data);
                response.end();
            }
        });
    }
};