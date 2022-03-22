const http = require('http')
const express = require('express')
var app = express()
const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

const cb2 = function (req, res) {
    res.send('Hello from C!')
}
http.createServer(app.get('/example/b', [cb0, cb1, cb2])).listen(3000)


