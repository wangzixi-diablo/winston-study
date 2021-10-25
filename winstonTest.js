const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  //format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  /*transports: [
    new winston.transports.File({ filename: 'data/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'data/combined.log' }),
  ]*/
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.colorize({ all: true }),
        winston.format.simple()
    )}));
}

console.log('Logger initialized successfully!');

function info(content){
    logger.info(content);
}

function error(content){
    logger.error(content);
}

module.exports = {
    info: info,
    error: error
};