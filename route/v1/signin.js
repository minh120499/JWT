const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.username


    const user = User.findOne({ username }, (err, user) => {

        if (err) {
            return res.json({ err })
        }

        if (!user) {
            return res.json({ "err": "user k tt" })
        }

        const matched = user.checkPassword(password)

        if (!matched) {
            return res.json({ "err": "pw k match" })
        }

        const token = user.getToken()
        res.cookie('token', token)
        return res.json({ token })
    })
})

module.exports = router