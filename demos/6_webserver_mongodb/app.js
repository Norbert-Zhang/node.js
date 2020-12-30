const http = require('http');
const route = require('./modules/route');
const ejs = require('ejs');
const querystring = require('querystring');

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://admin:123456@localhost:27097';
const dbName = 'itying';

const server = http.createServer(route);
server.listen(8080);

route.static('public');

route.get('/register', function (request, response) {
    ejs.renderFile('./views/register.ejs', {}, (err, data) => {
        response.send(data);
    });
});

route.get('/login', function (request, response) {
    let msg = 'This is a message.';
    ejs.renderFile('./views/login.ejs', { msg: msg }, (err, data) => {
        response.send(data);
    });
});

route.get('/admin', function (request, response) {
    // Connect the MongoDB
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("connection is ok...");
        // Find the specific DB
        let db = dbClient.db(dbName);
        // find the data
        db.collection('user').find({}).toArray((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            // Must be closed, after the operation
            dbClient.close();

            let msg = 'User list:';
            ejs.renderFile('./views/users.ejs', { msg: msg, list: data }, (err, data) => {
                response.send(data);
            });
        });
    });
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

route.post('/registeruser', function (request, response) {
    // Convert the query string to object.
    let user = querystring.parse(request.body);
    user.age = parseInt(user.age); // parseInt
    console.log(user);
    // Connect the MongoDB
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("connection is ok...");
        // Find the specific DB
        let db = dbClient.db(dbName);
        // Add the data
        db.collection('user').insertOne(user, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            // Must be closed, after the operation
            dbClient.close();

            response.send('register success...');
        });
    });
});

console.log('Server running at http://127.0.0.1:8080');