const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime.json');//list of file extensions with mime types: https://github.com/micnic/mime.json

function extendResponse(response) {
    response.send = (data) => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8' });
        response.end(data);
    }
};

function staticServer(request, response, staticPath) {
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
    try {
        let data = fs.readFileSync(filePath);
        data = data ? data : '';
        response.writeHead(200, { 'Content-Type': contentType + ';charset="utf-8' });
        response.end(data);
        return true;
    } catch (error) {
        //console.log(error);
    }
    return false;
};

let server = () => {
    // register controller
    let G = {
        _get: {},
        _post: {},
        staticPath: 'static' // for the public files (static html, css, js, images...)
    };

    // Calling this, when request comes.
    let app = (request, response) => {
        // Extend the response.
        extendResponse(response);
        // Create the static web server and check, if it is the static file request.
        if (!staticServer(request, response, './' + G.staticPath)) {
            // Get the query parameter object
            let query = url.parse(request.url, true).query;
            if (query.id) console.log(query);
            // Get the url (path name)
            let pathName = url.parse(request.url).pathname;
            console.log(pathName);
            let method = request.method.toLowerCase();
            if (G['_' + method] && G['_' + method][pathName]) {
                if (method == 'get') {
                    // Call the handling function
                    G['_' + method][pathName](request, response,);
                } else {
                    // Get the post data
                    let postData = '';
                    request.on('data', (chunk) => {
                        if (chunk) postData += chunk;
                    });
                    request.on('end', () => {
                        // Set the post data in request.body 
                        request.body = postData;
                        // Call the handling function
                        G['_' + method][pathName](request, response,);
                    });
                }
            } else {
                response.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8' });
                response.end('404. The Page is not available.');
            }
        }
    };

    app.get = function (str, cb) {
        // register the cb function for "GET" request
        G._get[str] = cb;
    };

    app.post = function (str, cb) {
        // register the cb function for "POST" request
        G._post[str] = cb;
    };

    app.static = function (staticPath) {
        // Set the folder for the static files
        if (staticPath) G.staticPath = staticPath;
    }

    return app;
};

module.exports = server();