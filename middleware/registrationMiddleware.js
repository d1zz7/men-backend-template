const httpError = require('../controllers/errorController')
const User = require('../models/User')

module.exports = function (req, res, next) {
    const { login, firstName, email, password } = req.body

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const loginExist = User.findOne({ login })
    const emailExist = User.findOne({ email })

    if (loginExist) {
        next(httpError.badRequest('User with this login already exists'))
    }
    if (emailExist) {
        next(httpError.badRequest('User with this email already exists'))
    }
    if (password.length < 6) {
        next(httpError.badRequest('Minimum password length 6 characters'))
    }
    if (!email.match(validRegex)) {
        next(httpError.badRequest('Invalid email address'))
    }
    if (login && firstName) {
        next()
    } else {
        next(httpError.badRequest('All fields must be filled'))
    }
}
