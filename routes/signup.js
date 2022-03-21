const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/jwt', (req, res, next) => {
    const secret = 'ahihi'
    const payload = {
        "username": req.body.username,
        "password": req.body.password
    }
    const token = jwt.sign(payload, secret)
    res.cookie('token', token)
    res.render('welcome', { token })
})

router.use('/', (req, res, next) => {
    res.render('signup')
})

module.exports = router