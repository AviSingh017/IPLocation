const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      level: 'error',
      db: process.env.mongoURL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: 'logs',
    }),
  ],
});

module.exports = logger;
