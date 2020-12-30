const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const url = require('url');

const app = express();
// set the html engine with ejs!!!
app.engine('html', ejs.__express);
// set the html "view engine" in the express!!!
app.set("view engine", "html");
// set the folder for the "views" (template files).
app.set("views", __dirname + "/views");
// for the static file folder (static web server)
app.use(express.static("public"));
// for parsing application/json!!!
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded!!!
app.use(bodyParser.urlencoded({ extended: true }));
// for cookie parser
app.use(cookieParser("data encryption key"));
// for the session settings
app.use(session({
    secret: 'data encryption key',
    name: "session_name_devfree",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store.
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 minutes
        secure: false, // be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
    },
    rolling: true,
    store: new MongoStore({
        url: 'mongodb://admin:123456@localhost:27097/',
        touchAfter: 24 * 3600 // the session is updated only one time in a period of 24 hours  (with the exception of those that change something on the session data).
    })
}));
// preprocessing middleware (e.g. log date, checking the user right, session info...)!!!
app.use((request, response, next) => {
    let pathname = url.parse(request.url).pathname;
    //console.log(new Date());
    // checkUserRight();
    // count the views
    if (pathname != "/favicon.ico") {
        if (!request.session.views) request.session.views = {};
        request.session.views[pathname] = (request.session.views[pathname] || 0) + 1;
        console.log(request.session);
    }
    next();
});

app.get('/loginout', function (request, response) {
    // delete all the data in the session
    request.session.cookie.maxAge = 0; // request.session.destroy();
    // delete the specific data in the session
    //request.session.username = '';
    response.send('loginout...');
});

app.get('/register', function (request, response) {
    response.send('register...');
});

app.get('/login', function (request, response) {
    //console.log('Cookies: ', request.cookies);
    console.log('Signed Cookies: ', request.signedCookies);
    // If possible, get the user name from the cookie!!!
    //var username = request.cookies.username ? request.cookies.username : ''; // get the normal cookies
    var username = request.signedCookies.username ? request.signedCookies.username : ''; // get the signed cookies
    response.render("login.html", { username: username });
});

app.get('/admin', function (request, response) {
    response.send('admin...');
});

app.get('/news', function (request, response) {
    // show/resolve html string!!!
    let msg = '<h3>News list:</h3>';
    let list = [{ title: 'news 1' }, { title: 'news 2' }, { title: 'news 3' }];
    let footer = '<div>views: ' + request.session.views['/news'] + '</div>' + '<div>expires in: ' + parseInt(request.session.cookie.maxAge / 1000 / 60) + ' minutes</div>';
    response.render("news.html", { msg: msg, list: list, footer: footer });
});

app.post('/validatelogin', function (request, response) {
    console.log(request.body);
    if (request.body.username) {
        // If possible, write the user name in the cookie!!!
        response.cookie("username", request.body.username, { maxAge: 1000 * 60 * 60, domain: ".devfree.com", signed: true });
        request.session.username = request.body.username;
    }
    response.send(request.body);
});
// static route
app.get('/article', function (request, response) {
    response.send('article...');
});
// route middleware!!!
app.get('/article/add', function (request, response, next) {
    console.log('add article...');
    //response.send('add article...');
    next();
});
// get the dynamic route parameters!!!
app.get('/article/:id', function (request, response) {
    console.log(request.params);
    var id = request.params['id'];
    response.send('article ' + id + ' ...');
});
// get the query string object!!!
app.get('/product', function (request, response) {
    let query = request.query;
    console.log(query);
    let str = 'product '
    if (query && query.id) str += query.id;
    response.send(str);
});

// error middleware (can not find the route)!!!
app.use((request, response, next) => {
    //console.log("can not find the route...");
    response.sendStatus(404);
    //next();
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server running at http://127.0.0.1:' + port);