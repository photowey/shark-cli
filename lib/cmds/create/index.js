/**
 * $ shark create cmd handler.
 */

// Charset.
// const iconv = require('iconv-lite');


const {
    asking,
    packageAsking,
    confirmInput
} = require('./asking');

const {
    logger
} = require('../../logger');

const functions = require('../../../lib/utils/functions.utils');
const svn = require('../../../lib/utils/svn.utils');

const unzip = require('../../utils/unzip');

/**
 * Handlde the $ shark create cmd.
 * @param {*} config 
 */
async function create(config = {}) {

    // 1.Do asking.
    const answers = await doAsking(config);
    logger.dir(answers)

    // 下载 模板
    // svn checkout https://192.168.2.10:8080/svn/GovProEleTrade/管理文档/2019需求说明/随机抽取小程序.zip

    let svnUrl = 'https://192.168.2.10:8080/svn/GovProEleTrade/管理文档/2019需求说明/随机抽取小程序.zip'

    // C:\Users\Administrator\.shark\.__shark_project_fetch_temp_dir\随机抽取小程序.zip

    /**
     *     const source = 'D:\\photowey-vue\\zip-test\\test.zip'
    const dest = 'D:\\photowey-vue\\zip-test\\test'
     */
    let template = await svn.fetchTemplate(svnUrl, true);

    console.log(template)
    unzip(template.projectPath, template.tempDir)

    // 解压模板
    // 模板替换
    // 生成项目
}

async function doAsking(config) {

    const answers = await asking(config);
    functions.cloneProperty(config, answers, 'code')
    // Package
    const package = await packageAsking(config);
    functions.cloneProperty(answers, package, 'package')

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$shark create report:`)
    logger.green(`项目代号: ${answers['code']}`)
    logger.green(`项目名称: ${answers['name']}`)
    logger.green(`是否需要内嵌工作流: ${answers['flowable']?'√':'×'}`)
    logger.green(`项目包名: ${answers['package']}`)
    logger.white('------------------------------------------------------------------')

    // Confirm the input infos.
    const confirm = await confirmInput(config);
    if (!confirm['flowable']) {
        logger.red(`项目输入信息有误,交互即将退出,请稍后重试...￣□￣｜｜`)
        process.exit(1)
    }

    return answers
}

module.exports = {
    create
}