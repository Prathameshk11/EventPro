// /config/default.js
module.exports = {
    server: {
      port: process.env.PORT || 5000,
    },
    database: {
      url: process.env.MONGODB_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiration: '1d',
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
    },
  };