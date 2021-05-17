/**
 * $ shark cli cmd funtion utils.
 */
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
 * Clone the given property.
 * @param {*} target the target object.
 * @param {*} source the source object.
 * @param {*} key the given key
 */
 function cloneProperty(target, source, key) {
    target[key] = source[key]
}

/**
 * toString()
 * @param {*} item 
 * @returns 
 */
const toString = item => {
    if (typeof item == 'object') {
        if (Array.isArray(item)) {
            return item.map(it => toString(it)).join(', ');
        }
        return Object.keys(item)
            .map(k => `${k}: ${typeof item[k] != 'function' && typeof item[k] != 'object' ? toString(item[k]) : 'Object'}`)
            .join(', ');
    }
    return item ? item.toString() : item;
};

/**
 * printSuccess()
 */
const printSuccess = () => {
    if (process.exitCode === undefined || process.exitCode === 0) {
        logger.log(chalk.green.bold(SUCCESS_MESSAGE));
        logger.log(chalk.cyan.bold(SPONSOR_MESSAGE));
    } else {
        logger.error(`ERROR! Shark finished with code ${process.exitCode}`);
    }
};

/**
 * exports
 */
module.exports = {
    hasYarn,
    hasJava,
    hasMvn,
    callScript,
    startScript,
    cloneProperty,
    toString,
    printSuccess
};