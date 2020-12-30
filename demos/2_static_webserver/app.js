const http = require('http');
const routes = require('./modules/routes');

const server = http.createServer(function (request, response) {
    // Create the static web server
    routes.static(request, response, 'static');
});
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080');