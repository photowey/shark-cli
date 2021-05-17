/**
 * $ shark deploy cmd handler.
 */

const path = require('path');
const {
    asking
} = require('./asking');

const functionsUtils = require("../../utils/functions.utils");

const {
    logger
} = require('../../logger')

const {
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE
} = require('../../utils/constants')

const {
    loadSharkDB
} = require('../deploy/asking')

/**
 * deploy
 * @param {*} param config = options + program
 */
async function deploy(config = {}) {

    const {
        cmd,
        program
    } = config

    // relative path:

    // ~/xxx-yyy-svn
    // ~/xxx-yyy-svn/trunk/xxx-yyyexe  -- the programmer's ws, at svn.trunk branches
    // ~/xxx-yyy-svn/current/xxx-yyyexe -- the programmer's ws, at svn.current branches

    // ~/xxx-yyy-svn/ZCtrlCenter
    // ~/xxx-yyy-svn/ZCtrlCenter/script
    // ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat

    // ~\xxx-yyy-svn\trunk\xxx-yyyexe
    let projectDir = program.args[0] ? path.resolve(process.cwd(), path.normalize(program.args[0])) : process.cwd();

    let db = loadSharkDB()
    
    // Do asking.
    const answers = await asking(config);

    if (answers['code'] !== 'this') {
        var projects = Array.prototype.slice.call(db['projects']);
        projects.forEach((project) => {
            if (project['code'] === answers['code']) {
                projectDir = path.normalize(project['path'])
            }
        })
    }

    // ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat
    const scriptPath = "../../ZCtrlCenter/script/发布程序到指定环境.bat"

    let hot = answers['hot'] ? '' : 'cr'


    // "trunk,test,zcj,,provider"
    const parameters = ` \"${answers['branch']},${answers['evn']},${answers['machine']},${hot},${answers['module']}\"`

    // ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    const deployScript = path.resolve(projectDir, scriptPath + parameters)

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$shark deploy report:`)
    logger.green(`Parse [${cmd}] successfully!`)
    logger.cyan(`Handle the cmd:[$ ${cmd}], the options::branch:[${answers['branch']}];env:[${answers['evn']}];machineRoom:[${answers['machine']}]`)
    logger.white('------------------------------------------------------------------')

    if (answers['release']) {
        let releaseScript = `${projectDir}${path.sep}release.bat`
        functionsUtils.callScript(releaseScript)
    }

    // start ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    functionsUtils.callScript(deployScript)

    // Congratulations.
    logger.white('------------------------------------------------------------------')
    logger.green(`${SUCCESS_MESSAGE} *@_@*!`)
    logger.green(`${SPONSOR_MESSAGE}`)
    logger.white('------------------------------------------------------------------')
};

module.exports = {
    deploy
};