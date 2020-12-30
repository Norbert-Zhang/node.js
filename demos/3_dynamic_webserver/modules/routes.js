const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime.json');//list of file extensions with mime types: https://github.com/micnic/mime.json
const ejs = require('ejs');

let app = {
    static: (request, response, staticPath) => {
        // 1. get the url (path name)
        let pathName = url.parse(request.url).pathname;
        // If needed, navigate to the root 'index.html'
        pathName = pathName == '/' ? '/index.html' : pathName;
        // 2. get the static file path
        let filePath = staticPath + pathName;
        console.log(filePath);
        let extname = path.extname(pathName).replace('.', '');
        let contentType = mime[extname];
        if (!contentType) contentType = 'text/html';
        if (pathName != '/favicon.ico') {
            try {
                let data = fs.readFileSync(filePath);
                data = data ? data : '';
                response.writeHead(200, { 'Content-Type': contentType + ';charset="utf-8' });
                response.end(data);
                return true;
            } catch (error) {
                //console.log(error);
                return false;
            }
        }
        return false;
    },
    register: (request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
        response.end('register...');
    },
    login: (request, response) => {
        let msg = 'This is a message.';
        ejs.renderFile('./views/login.ejs', { msg: msg }, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
            response.end(data);
        });
    },
    validatelogin: (request, response) => {
        // handle the post data
        let postData = '';
        request.on('data', (chunk) => {
            if (chunk) postData += chunk;
        });
        request.on('end', () => {
            console.log(postData);
            response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
            response.end(postData);
        });
    },
    admin: (request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
        response.end('admin...');
    },
    news: (request, response) => {
        let msg = 'News list:';
        let list = [{ title: 'news 1' }, { title: 'news 2' }, { title: 'news 3' }];
        ejs.renderFile('./views/news.ejs', { msg: msg, list: list }, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
            response.end(data);
        });
    },
    error: (request, response) => {
        response.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8' });
        response.end('404. The Page is not available.');
    }
};

module.exports = app;