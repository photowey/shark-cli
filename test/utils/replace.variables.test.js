const path = require("path");
const fs = require("fs");

const assert = require("assert");

const {
    VariableContext
} = require('../../lib/context');

const replacer = require('../../lib/utils/replace.variables');

/**
 * replaceVariables()
 */
describe('#replaceVariables()', function () {
    let contexts = new VariableContext()
    contexts['key1'] = 'value11'
    contexts['key2'] = 'value22'
    contexts['key3'] = 'value33'

    contexts['packagePath'] = 'com.photowey.template'
    contexts['author'] = 'photowey'
    contexts['date'] = '2021/05/15'
    contexts['version'] = '1.0.0'
    contexts['fileName'] = 'JavaTest'

    let content = 'key1=${key1}-key2=${key2}-key3=${key3}'

    var result = replacer.replaceVariables(content, contexts)
    assert.strictEqual(result, 'key1=value11-key2=value22-key3=value33')
    let currentDir = path.resolve(process.cwd())
    let data = fs.readFileSync(currentDir + '/TestJava.java', 'UTF-8')
    let contentx = data.toString()
    var resultx = replacer.replaceVariables(contentx, contexts)

    fs.writeFile(currentDir + '/JavaTest.java', resultx, 'UTF-8', (err) => {
        if (err) {
            logger.info('write file error:' + err)
        }
    })
});