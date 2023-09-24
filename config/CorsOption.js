const allowedOrigins = require('./AllowedOrigins')

const CorsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed By Cors '))
    }
  },
  credentials: true,
  optionsSucessStatus: 200,
}

module.exports = CorsOption
