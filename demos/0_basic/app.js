// ****** Custom Module ******
const logger = require('./logger.js');
//console.log(logger);
logger.logTest("This is a log test...");

// ****** Building in Module ******
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log('Total Memory: ' + totalMemory);
console.log('Free Memory: ' + freeMemory);
//console.log('os: ', os);

const fs = require('fs');
// using Async method!
fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});

const EventEmitter = require('events');
const emitter = new EventEmitter();
// Register a listener
emitter.on('messageLoggedTest', (arg) => {
    console.log('Test Listener called!', arg);
});
// Raise an event
emitter.emit('messageLoggedTest', { id: 1, url: 'http://' });

const LoggerEvent = require('./loggerEvent.js');
const loggerEvent = new LoggerEvent();
// Register a listener
loggerEvent.on('messageLogged', (arg) => {
    console.log('Listener called!', arg);
});
// Raise the message event with a class!!
loggerEvent.log("message");

const http = require('http');
const Server = http.createServer(function (req, res) {//http://localhost:3000
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/functions') { //http://localhost:3000/api/functions
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
const port = process.env.PORT || 8080;
console.log(process.env.PORT);
Server.listen(port);
console.log('Server running at http://127.0.0.1:' + port);
// Ctrl + C restart the Node.js server!!!





