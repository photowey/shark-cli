const cmdUtils = require("../utils/utils");

/**
 * deploy
 * @param {*} param config
 */
async function deploy(config) {
    const { branch, env, machineRoom, program } = config
    console.log("handle the cmd: shark deloy,the args::branch:[%s];env:[%s];machineRoom:[%s]", branch, env, machineRoom)
};


function callDeployScript() {

}

module.exports = {
    deploy
};