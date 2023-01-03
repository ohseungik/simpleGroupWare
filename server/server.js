
// function settings
const model = require('./model.js');
const api = require('./api/api.js');

// mongoose settings
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/simpleGroupWare');
const db = mongoose.connection;

// user DB connection seetingss
const userSchema = new Schema(model.user);
const User = mongoose.model('user', userSchema);

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function () {
    console.log('DB 연결 성공');
})

// express server settings
const express = require('express');
const session = require('express-session');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(session({
    secret: "simpleGroupWare20221201",
    resave: true,
    saveUninitialized: true,
    cookie: {
        // session timeout settings
        expires: 60000
    }
}))

server.listen(5000, function () {
    console.log("server listening at http://localhost:5000");
})

// api settings
server.use("/api/join", function (req, res) {
    api.ServiceAPI.join(req, res, User);
});

server.use("/api/login", function (req, res) {
    api.ServiceAPI.login(req, res, User);
});
server.use("/api/logout", api.ServiceAPI.logout); 
server.use("/api/work", function (req, res) {
    api.ServiceAPI.work(req, res, User);
});

server.use("/api/workStart", function (req, res) {
    api.ServiceAPI.workStart(req, res, User);
});

server.use("/api/workEnd", function (req, res) {
    api.ServiceAPI.workEnd(req, res, User);
});

server.use("/api/workOne", function (req, res) {
    api.ServiceAPI.workOne(req, res, User);
});















