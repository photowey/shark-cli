/**
 * $ shark deploy cmd handler.
 */
const path = require('path');
const chalk = require('chalk')

var os = require('os');

const functionsUtils = require("../utils/functions-utils");

/**
 * deploy
 * @param {*} param config = options + program
 */
async function deploy(config) {

    const {
        cmd,
        branch,
        env,
        machineRoom,
        program
    } = config

    // relative path:

    // ~/unit-stock-svn
    // ~/unit-stock-svn/trunk/unit-stockexe  -- the programmer's ws, at svn.trunk branches
    // ~/unit-stock-svn/current/unit-stockexe -- the programmer's ws, at svn.current branches

    // ~/unit-stock-svn/ZCtrlCenter
    // ~/unit-stock-svn/ZCtrlCenter/script
    // ~/unit-stock-svn/ZCtrlCenter/script/发布程序到指定环境.bat

    // ~\unit-stock-svn\trunk\unit-stockexe
    const projectDir = program.args[0] ? path.resolve(process.cwd(), path.normalize(program.args[0])) : process.cwd();

    // ~/unit-stock-svn/ZCtrlCenter/script/发布程序到指定环境.bat
    const scriptPath = "../../ZCtrlCenter/script/发布程序到指定环境.bat"

    // "trunk,test,zcj,,provider"
    const parameters = ` \"${branch},${env},${machineRoom},,provider\"`

    // ~/unit-stock-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    const deployScript = path.resolve(projectDir, scriptPath + parameters)

    console.log(chalk.white('------------------------------------------------------------------'))
    console.log(chalk.red('shark report:'))
    console.log(chalk.green('Parse [%s] successfully!'), cmd)
    console.log(chalk.yellow('Handle the cmd:[%s], the options::branch:[%s];env:[%s];machineRoom:[%s]'), cmd, branch, env, machineRoom)
    console.log(chalk.green("Let's deploy gracefully *@_@*!"))
    console.log(chalk.red('The next, exec the [%s]\'s script...'), os.type().split('_')[0])
    console.log(chalk.white('------------------------------------------------------------------'))

    // start ~/unit-stock-svn/ZCtrlCenter/script/发布程序到指定环境.bat "trunk,test,zcj,,provider"
    functionsUtils.startScript(deployScript)
};

module.exports = {
    deploy
};