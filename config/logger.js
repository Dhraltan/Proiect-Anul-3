const log4js = require('log4js'); //Import log4js

log4js.configure({
    appenders: { fileAppender: { type:'file', filename: './logs/logFile.log' } },
    categories: { default: { appenders: ['fileAppender'], level:'info' } }
}); // We configure it to add messages to a file

const logger = log4js.getLogger();

module.exports = { logger };