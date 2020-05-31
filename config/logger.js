const log4js = require('log4js');

log4js.configure({
    appenders: { fileAppender: { type:'file', filename: './logs/logFile.log' } },
    categories: { default: { appenders: ['fileAppender'], level:'info' } }
});

const logger = log4js.getLogger();

module.exports = { logger };