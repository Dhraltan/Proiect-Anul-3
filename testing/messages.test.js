const { formatMessage, formatMessage2 } = require('../models/messages'); //We bring in the format message functions
const moment = require('moment'); //We bring this in to have the current time

test('Checking if there is a definition', () => {
    expect(formatMessage()).toBeDefined();
});

test('Returns an object with username, text and time', () => {
    expect(formatMessage('Nume','Text')).toEqual({
        username: 'Nume',
        text: 'Text',
        time: moment().format('h:mm a')
    });
});

test('Checking if there is a definition', () => {
    expect(formatMessage2()).toBeDefined();
});

test('Returns an object with username, text and time', () => {
    expect(formatMessage2('Nume2','Text2', '12:50')).toEqual({
        username: 'Nume2',
        text: 'Text2',
        time: '12:50'
    });
});