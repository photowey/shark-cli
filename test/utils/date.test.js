const assert = require("assert");

const formatter = require('../../lib/utils/date.format')

const {
    logger
} = require('../../lib/logger');

/**
 * replaceVariables()
 */
describe('format', function () {
    let now = new Date()
    let date1 = now.format('yyyy-MM-dd HH:mm:ss');
    let date2 = now.format('yyyy/MM/dd HH:mm:ss');
    let date3 = now.format('yyyy/MM/dd');
    let date4 = formatter.format(now, 'yyyy/MM/dd');
    logger.debug(date1)
    logger.info(date2)
    logger.warn(date3)
    logger.error(date4)
    // assert.strictEqual(date3, '2021/05/18')
    // assert.strictEqual(date4, '2021/05/18')
});