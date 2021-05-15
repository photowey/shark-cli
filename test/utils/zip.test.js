const zip = require('../../lib/utils/zip');

describe('#zip', function () {
    const source = 'D:\\photowey-vue\\zip-test'
    const dest = 'D:\\photowey-vue\\zip-test'
    const fileName = 'test'
    zip(source, dest, fileName)
});