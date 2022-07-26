const cors = require('cors')

const whitelist = ['http://example1.com', 'http://example2.com']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: 'GET,PUT,POST,DELETE'
}

if (process.env.NODE_ENV === 'production') {
    module.exports = cors(corsOptions)
} else {
    module.exports = cors()
}
