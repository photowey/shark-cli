const unzip = require('../../lib/utils/unzip');

describe('#unzip()', function () {
    const source = 'D:\\photowey-zip\\zip-test\\test.zip'
    const dest = 'D:\\photowey-zip\\zip-test\\test'
    unzip(source, dest)
});