const User = require('../models/User')
const httpError = require('./errorController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 12

class UserController {
    async registration(req, res, next) {
        try {
            const { login, firstName, lastName, email, password } = req.body
            const hash = bcrypt.hash(password, saltRounds)
            const user = new User({
                password: hash,
                lastName: lastName || null,
                login,
                firstName,
                email
            })
            await user.save()
        } catch (e) {
            next(httpError.internal(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body

            if (!password || !login) {
                next(httpError.badRequest('Enter login and password'))
            }
            const user = User.findOne({ login })

            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const jwtToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' })
                res.json(jwtToken)
            }

            next(Error.badRequest('Incorrect login or password'))
        } catch (e) {
            next(httpError.internal(e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const user = User.findOne(req.user)
            const jwtToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' })
            return res.json(jwtToken)
        } catch (e) {
            next(httpError.internal(e.message))
        }
    }
}

module.exports = new UserController()
