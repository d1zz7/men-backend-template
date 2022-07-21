const httpError = require('../controllers/errorController')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const jwtToken = req.headers.authorization.split(' ')[1]
        if (!jwtToken) {
            next(httpError.unauthorized('Unauthorized'))
        }
        req.user = jwt.verify(jwtToken, process.env.SECRET_KEY)
        next()
    } catch (e) {
        next(httpError.unauthorized('Unauthorized'))
    }
}
