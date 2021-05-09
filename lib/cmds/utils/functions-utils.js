// shark-cli cmds utils
const child_process = require("child_process");

/**
 * Check Yarn
 * @returns {@code boolean}
 */
function hasYarn() {
    try {
        child_process.execSync("yarn --version", {
            stdio: "ignore"
        });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check Java
 * @returns {@code boolean}
 */
function hasJava() {
    try {
        child_process.execSync("java -version", {
            stdio: "ignore"
        });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check Maven
 * @returns {@code boolean}
 */
function hasMvn() {
    try {
        child_process.execSync("mvn -v", {
            stdio: "ignore"
        });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * execute script
 * @param {*} mode call mode
 * @param {*} fullName the cmd faull-name
 * @returns {@code boolean} 
 */
function privateExecuteScript(mode, fullName) {
    const targetCmd = mode + ' ' + fullName
    try {
        child_process.execSync(targetCmd, {
            stdio: "ignore"
        });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Use call mode
 * @param {*} fullName 
 * @returns 
 */
function callScript(fullName) {
    return privateExecuteScript('call', fullName)
}

/**
 * Use start mode
 * @param {*} fullName 
 * @returns 
 */
function startScript(fullName) {
    return privateExecuteScript('start', fullName)
}

/**
 * exports
 */
module.exports = {
    hasYarn,
    hasJava,
    hasMvn,
    callScript,
    startScript,
};