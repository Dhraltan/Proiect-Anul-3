const moment = require('moment'); //moment is used to get the current time

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;