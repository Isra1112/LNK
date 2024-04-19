const http = require("http");
const express = require("express");
//const logEvent = require('.')
const appRoutes = require('../src/routes/index.routes')
const appMiddleware = require('../src/middlewares/app-middlewares')


const app = express();
app.use("*/img",express.static(__dirname + './../public/img'));
app.use("*/css",express.static(__dirname + './../public/css'));
app.use("*/js",express.static(__dirname + './../public/js'));
app.use(appMiddleware);
app.use(appRoutes);
const server = http.createServer(app);
server.on('error',function(e){
    console.log('APP Failed');
});

module.exports = server;