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

const unzip = require('../../utils/unzip');

/**
 * Handlde the $ shark create cmd.
 * @param {*} config 
 */
async function create(config = {}) {

    // 1.Do asking.
    const answers = await doAsking(config);
    populateMvnInfo(answers)
    logger.dir(answers)
    logger.log(JSON.stringify(answers, '', 4))

    // 下载 模板
    // svn checkout https://192.168.2.10:8080/svn/GovProEleTrade/管理文档/2019需求说明/随机抽取小程序.zip

    let svnUrl = 'https://192.168.2.10:8080/svn/GovProEleTrade/管理文档/2019需求说明/随机抽取小程序.zip'

    // C:\Users\Administrator\.shark\.__shark_project_fetch_temp_dir\随机抽取小程序.zip

    /**
     *     const source = 'D:${path.sep}photowey-vue${path.sep}zip-test${path.sep}test.zip'
    const dest = 'D:${path.sep}photowey-vue${path.sep}zip-test${path.sep}test'
     */
    let template = await svn.fetchTemplate(svnUrl, true);

    logger.log(template)
    unzip(template.projectPath, template.tempDir)

    // 解压模板
    // 模板替换
    // 生成项目
}

/**
 * Populate the maven pom.xml dependency node info.
 * @param {*} answers 
 */
async function populateMvnInfo(answers) {

    await populateJavaPackagePath(answers)
    await populateDate(answers)
}

/**
 * Populate java src path.
 * @param {*} answers 
 */
async function populateJavaPackagePath(answers) {

    answers['appName'] = `${answers['code']}${answers['name']}`
    answers['guzz'] = `${answers['__package__path__'].split('\\').join('/')}`

    answers['__version__'] = `${answers['version']}-SNAPSHOT`

    answers['__src_main_java__'] = `src${path.sep}main${path.sep}java`
    answers['__src_main_resources__'] = `src${path.sep}main${path.sep}resources`

    answers['__src_test_java__'] = `src${path.sep}test${path.sep}java`
    answers['__src_test_resources__'] = `src${path.sep}test${path.sep}resources`

    let project = `${answers['project']}`

    answers['__client__'] = `${project}-client`
    answers['__core__'] = `${project}-core`
    answers['__provider__'] = `${project}-provider`
    answers['__repository__'] = `${project}-repository`
    answers['__service__'] = `${project}-service`

    let projectBasePath = `${answers['projectDir']}${path.sep}${answers['project']}`

    answers['__full_client__'] = `${projectBasePath}${path.sep}${answers['__client__']}`
    answers['__full_core__'] = `${projectBasePath}${path.sep}${answers['__core__']}`
    answers['__full_provider__'] = `${projectBasePath}${path.sep}${answers['__provider__']}`
    answers['__full_repository__'] = `${projectBasePath}${path.sep}${answers['__repository__']}`
    answers['__full_service__'] = `${projectBasePath}${path.sep}${answers['__service__']}`

    let now = new Date()
    answers['date'] = formatter.format(now, 'yyyy/MM/dd')
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

    answers['groupId'] = `com.${answers.code}`
    answers['artifactId'] = answers['project']

    // Package
    const package = await packageAsking(config);
    functions.cloneProperty(answers, package, '__package__')
    answers['__package__path__'] = answers['__package__'].replace(new RegExp(`${path.sep}.`, "g"), `${path.sep}`)

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$shark create report:`)
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