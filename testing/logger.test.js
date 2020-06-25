const {logger} = require('../config/logger');

test('Test if the logger is defined', () => {
    expect(logger).toBeDefined();
});