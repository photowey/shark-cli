const zip = require('../../lib/utils/zip');

describe('#zip', function () {
    const source = 'D:\\photowey-zip\\zip-test'
    const dest = 'D:\\photowey-zip\\zip-test'
    const fileName = 'test'
    zip(source, dest, fileName)
});