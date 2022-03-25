const express = require('express')

const signin = require('./signin')
const signup = require('./signup')
const getname = require('./getname')
const profile = require('./profile')

const router = express.Router()

router.use('/signin', signin)
router.use('/signup', signup)
router.use('/getname', getname)
router.use('/profile', profile)

module.exports = router