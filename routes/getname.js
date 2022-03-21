const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.get('/', (req, res, next) => {
    const token = req.cookies.token
    jwt.verify(token,'ahihi', (err, decode) => {
        return res.json({ name: decode.username })
    })
})

module.exports = router