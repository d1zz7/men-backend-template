const httpError = require('../controllers/errorController')
const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const jwtToken = req.headers.authorization.split(' ')[1]
            if (!jwtToken) {
                next(httpError.unauthorized('Unauthorized'))
            }
            const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY)

            if (!decoded.role === role) {
                next(httpError.forbidden('No access'))
            }
            next()
        } catch (e) {
            next(httpError.unauthorized('Unauthorized'))
        }
    }
}
