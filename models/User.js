const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    referal: String,
    bio: String
}, { timestamps: true })


// Get profile
schema.methods.getProfile = function (token) {
    const user = jwt.verify(token, 'ahihi', (err, decode) => {

        if (err) {
            return "invalid user"
        }

        return decode
    })
    return user
}
//


schema.method('checkPassword', function (password) {
    return this.passwordHash === crypto.createHash('md5').update(password).digest('hex')
})

schema.methods.genHashPassword = function (password) {
    console.log(password)
    return crypto.createHash('md5').update(password).digest('hex')
}

schema.statics.create = async function (data) {
    const exitsUser = await this.findOne({ username: data.username })
    if (exitsUser) {
        throw "cda ton tai"
    }

    const user = new this(data)
    if (data.password) {
        user.passwordHash = user.genHashPassword(data.password)
    }
    await user.save()
    console.log(data, user)
    return user
}

schema.pre('save', function () {
    if (!this.referal) {
        this.referal = Math.random()
    }
})

schema.methods.getToken = function () {
    const payload = {
        username: this.username,
        bio: this.bio
    }
    return jwt.sign(payload, 'ahihi')
}

module.exports = mongoose.model('User', schema)