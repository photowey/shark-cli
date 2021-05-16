const fs = require('fs-extra');
const path = require('path');

/**
 * rmdirSync()
 */
describe('#rmdirSync()', function () {
    const target = `D:${path.sep}photowey-vue${path.sep}zip-test${path.sep}test`
    fs.rmdirSync(target, {
        recursive: true
    })
});

/**
 * createFileSync()
 * outputFileSync()
 * readFileSync()
 */
describe('#createFileSync()|outputFileSync()|readFileSync()', function () {
    const target = `D:${path.sep}photowey-vue${path.sep}zip-test${path.sep}test${path.sep}testwrite${path.sep}index.js`
    // fs.createFileSync(target, (error)=>{})
    // Write
    fs.outputFileSync(target, 'console.log("Hello World!")')

    // Read
    const data = fs.readFileSync(target, 'utf8')
    console.log(data) // => console.log("Hello World!")

    console.log(path.sep)
    console.log(target + path.sep + "hello" + path.sep)
});