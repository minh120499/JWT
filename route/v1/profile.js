const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

// get profile
router.get('/', (req, res) => {
    const user = new User()
    const getUser = user.getProfile(req.cookies.token)
    res.json(getUser)
})


//update profile
router.post('/', (req, res) => {
    const newBio = new User()
    const valid = newBio.getProfile(req.cookies.token)
    if (!valid) {
        return res.json({ "message": "Cannot update" })
    }
    User
        .find({ username: valid.username }, (err, doc) => { })
        .updateOne({ bio: req.body.bio })
    User
        .findOne({ username: valid.username }, (err, doc) => {
            if (doc) {
                const payload = {
                    username: doc.username,
                    bio: doc.bio
                }
                console.log(doc, payload)
                res.cookie('token', jwt.sign(payload, 'ahihi'))
                res.json({
                    bio: doc.bio
                })
            }
        })

})

module.exports = router