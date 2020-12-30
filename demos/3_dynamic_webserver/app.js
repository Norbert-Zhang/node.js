const http = require('http');
const routes = require('./modules/routes');
const url = require('url');

const server = http.createServer(function (request, response) {
    // Create the static web server and check, if it is the static file request.
    if (!routes.static(request, response, './static')) {
        // Get the query parameter object
        let query = url.parse(request.url, true).query;
        if (query.id) console.log(query);
        // Get the url (path name)
        let pathName = url.parse(request.url).pathname.replace('/', '');
        try {
            routes[pathName](request, response);
        } catch (error) {
            routes['error'](request, response);
        }
    }
});
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080');