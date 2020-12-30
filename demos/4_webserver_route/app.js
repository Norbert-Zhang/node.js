const http = require('http');
const route = require('./modules/route');
const ejs = require('ejs');

const server = http.createServer(route);
server.listen(8080);

route.static('public');

route.get('/register', function (request, response) {
    response.send('register...');
});

route.get('/login', function (request, response) {
    let msg = 'This is a message.';
    ejs.renderFile('./views/login.ejs', { msg: msg }, (err, data) => {
        response.send(data);
    });
});

route.get('/admin', function (request, response) {
    response.send('admin...');
});

route.get('/news', function (request, response) {
    let msg = 'News list:';
    let list = [{ title: 'news 1' }, { title: 'news 2' }, { title: 'news 3' }];
    ejs.renderFile('./views/news.ejs', { msg: msg, list: list }, (err, data) => {
        response.send(data);
    });
});

route.post('/validatelogin', function (request, response) {
    console.log(request.body);
    response.send(request.body);
});

console.log('Server running at http://127.0.0.1:8080');