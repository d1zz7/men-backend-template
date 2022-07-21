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
  methods: "GET,PUT,POST,DELETE"
}

const customizedCors = cors(corsOptions)

module.exports = customizedCors
