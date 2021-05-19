/**
 * $ shark create cmd handler.
 */

// Charset.
// const iconv = require('iconv-lite');

const path = require('path');

const {
    asking,
    packageAsking,
    confirmInput
} = require('./asking');

const {
    logger
} = require('../../logger');

const functions = require('../../../lib/utils/functions.utils');
const formatter = require('../../../lib/utils/date.format')
const svn = require('../../../lib/utils/svn.utils');
const generator = require('../../../lib/utils/generator');

const {
    url
} = require('../../../svn.json')

// const unzip = require('../../utils/unzip');

/**
 * Handlde the $ shark create cmd.
 * @param {*} config 
 */
async function create(config = {}) {

    // 1.Fetch template from svn
    await svn.fetchTemplate(url, true);

    // 2.Asking some questions.
    const answers = await doAsking(config);

    // 3.Do code generate.
    await handleGenerate(answers)
}

/**
 * Generate the project.
 * @param {*} answers 
 */
async function handleGenerate(answers) {
    populateJavaPackagePath(answers)
    populateDate(answers)

    await generator.doGenerate(answers)
}

/**
 * Populate java src path.
 * @param {*} answers 
 */
function populateJavaPackagePath(answers) {

    answers['appName'] = `${answers['code']}${answers['name']}`
    answers['guzz'] = `${answers['__package_path__'].split('\\').join('/')}`

    answers['__version__'] = `${answers['version']}-SNAPSHOT`
}

/**
 * Populate date.
 * @param {*} answers 
 */
function populateDate(answers) {
    let now = new Date()
    answers['now'] = formatter.format(now, 'yyyy/MM/dd')
}

/**
 * Asking some questions.
 * @param {*} config 
 * @returns 
 */
async function doAsking(config) {

    const answers = await asking(config);
    functions.cloneProperty(config, answers, 'code')
    functions.cloneProperty(answers, config, 'project')
    functions.cloneProperty(answers, config, 'projectDir')

    answers['configURI'] = answers.code === 'zcj' ? 'http://192.168.2.217:9110' : 'http://192.168.2.12:8888'

    answers['groupId'] = `com.${answers.code}`
    answers['artifactId'] = answers['project']

    // Package
    const package = await packageAsking(config);
    functions.cloneProperty(answers, package, '__package__')
    answers['__package_path__'] = answers['__package__'].replace(new RegExp(`${path.sep}.`, "g"), `${path.sep}`)

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$ shark create report:`)
    logger.green(`项目: ${answers['project']}`)
    logger.green(`产品代号: ${answers['code']}`)
    logger.green(`名称: ${answers['name']}`)
    logger.green(`是否需要内嵌工作流: ${answers['flowable']?'√':'×'}`)
    logger.green(`包名: ${answers['__package__']}`)
    logger.white('------------------------------------------------------------------')

    // Confirm the input infos.
    const confirm = await confirmInput(config);
    if (!confirm['flowable']) {
        logger.red(`项目信息输入有误,交互即将退出,请稍后重试...￣□￣｜｜`)
        process.exit(1)
    }

    return answers
}

module.exports = {
    create
}