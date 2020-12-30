/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const helmet = require("helmet");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const logger = require('morgan');

const admin = require('./routes/admin');
const index = require('./routes/index');
const api = require('./routes/api');

const app = express();
// Security HTTP Headers!!!
//app.use(helmet());
// set the html engine with ejs!!!
app.engine('html', ejs.__express);
// set the html "view engine" in the express!!!
app.set("view engine", "html");
// set the folder for the "views" (template files).
app.set('views', path.join(__dirname, 'views'));
// HTTP request logger
app.use(logger('dev'));
// for the static file folder (static web server)
app.use(express.static(path.join(__dirname, 'public')));
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
    saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store.
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 minutes
        secure: false, // be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
    },
    rolling: true,
    store: new MongoStore({
        url: 'mongodb://admin:123456@127.0.0.1:27097/admin', // 'mongodb://admin:123456@localhost:27097/admin',
        touchAfter: 24 * 3600 // the session is updated only one time in a period of 24 hours  (with the exception of those that change something on the session data).
    })
}));
// preprocessing middleware (e.g. log date, checking the user right, session info...)!!!
app.use((req, res, next) => {
    // console.log(new Date());
    // checkUserRight();
    // count the views
    if (req.originalUrl != "/favicon.ico") {
        if (!req.session.views) req.session.views = {};
        req.session.views[req.originalUrl] = (req.session.views[req.originalUrl] || 0) + 1;
        //console.log(req.session);
    }
    next();
});
app.use('/admin', admin);
app.use('/api', api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    //console.error(err.stack);
    if (req.xhr) { // XMLHttpRequest or Ajax
        res.status(500).send({ error: 'Something failed!' })
    } else {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error.html');
    }
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server running at http://127.0.0.1:' + port);


