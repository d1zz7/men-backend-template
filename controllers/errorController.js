class httpError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static unauthorized(message) {
        return new httpError(401, message)
    }

    static forbidden(message) {
        return new httpError(403, message)
    }

    static badRequest(message) {
        return new httpError(404, message)
    }

    static internal(message) {
        return new httpError(500, message)
    }
}

module.exports = httpError
