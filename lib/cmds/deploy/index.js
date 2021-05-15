/**
 * $ shark deploy cmd handler.
 */

const path = require('path');

const functionsUtils = require("../../utils/functions.utils");

const {
    logger
} = require('../../logger')

const {
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE
} = require('../../utils/constants')

/**
 * deploy
 * @param {*} param config = options + program
 */
async function deploy(config = {}) {

    const {
        cmd,
        branch,
        env,
        machineRoom,
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
    const projectDir = program.args[0] ? path.resolve(process.cwd(), path.normalize(program.args[0])) : process.cwd();

    // ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat
    const scriptPath = "../../ZCtrlCenter/script/发布程序到指定环境.bat"

    // "trunk,test,zcj,,provider"
    const parameters = ` \"${branch},${env},${machineRoom},,provider\"`

    // ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    const deployScript = path.resolve(projectDir, scriptPath + parameters)

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$shark deploy report:`)
    logger.green(`Parse [${cmd}] successfully!`)
    logger.yellow(`Handle the cmd:[${cmd}], the options::branch:[${branch}];env:[${env}];machineRoom:[${machineRoom}]`)
    logger.green(`${SUCCESS_MESSAGE} *@_@*!`)
    logger.green(`${SPONSOR_MESSAGE}`)
    logger.white('------------------------------------------------------------------')

    // start ~/xxx-yyy-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    functionsUtils.startScript(deployScript)
};

module.exports = {
    deploy
};