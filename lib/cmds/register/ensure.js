/**
 * $ shark cli init.
 */

const fs = require('fs-extra');

const {
    SHARK_HOME
} = require('../../utils/constants')

/**
 * Ensure.
 * @param {*} params 
 * @returns 
 */
function doEnsure() {
    ensureDirSync()
}

/**
 * Prepare to create a home directory.
 */
function ensureDirSync() {
    fs.ensureDirSync(SHARK_HOME)
}

module.exports = {
    doEnsure
}