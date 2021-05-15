const unzip = require('../../lib/utils/unzip');

describe('#unzip()', function () {
    const source = 'D:\\photowey-vue\\zip-test\\test.zip'
    const dest = 'D:\\photowey-vue\\zip-test\\test'
    unzip(source, dest)
});