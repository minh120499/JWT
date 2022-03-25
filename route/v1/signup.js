const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


router.post('/', (req, res, next) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio
    })
        .then(user => {
            const token = user.getToken()
            res.cookie('token', token)
            return res.json({ token })
        })
        .catch(e => {
            return res.json({ e })
        })
})


module.exports = router