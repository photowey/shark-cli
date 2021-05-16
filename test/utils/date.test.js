const assert = require("assert");

const formatter = require('../../lib/utils/date.format')

/**
 * replaceVariables()
 */
describe('#functions()', function () {
    let now = new Date()
    let date1 = now.format('yyyy-MM-dd HH:mm:ss');
    let date2 = now.format('yyyy/MM/dd HH:mm:ss');
    let date3 = now.format('yyyy/MM/dd');
    let date4 = formatter.format(now, 'yyyy/MM/dd');
    console.log(date1)
    console.log(date2)
    console.log(date3)
    console.log(date4)
    assert.strictEqual(date3, '2021/05/16')
    assert.strictEqual(date4, '2021/05/16')
});