/**
 * $ shark register cmd handler.
 */

const path = require('path');
const fs = require('fs')

const {
    asking
} = require('./asking')

const {
    logger
} = require('../../logger')

const {
    Project
} = require('../../model/register.model');

const {
    SHARK_HOME,
    SHARK_DB,
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE
} = require('../../utils/constants')

const {
    loadSharkDB
} = require('../deploy/asking')

/**
 * register()
 * @param {*} config 
 */
async function register(config = {}) {
    const {
        cmd
    } = config

    // Do asking.
    const answers = await asking(config)
    const projectDir = answers['projectPath'] ? path.resolve(process.cwd(), path.normalize(answers['projectPath'])) : process.cwd();
    // Load the db.
    let db = loadSharkDB()
    let projects = db['projects'] || []

    const project = new Project(answers['projectCode'], answers['projectName'], projectDir)
    projects.push(project)
    db['projects'] = projects

    fs.writeFile(SHARK_DB, JSON.stringify(db, "", 4), 'UTF-8', (err) => {
        if (err) {
            logger.info('write file error:' + err)
        }
    })

    // Report
    logger.white('------------------------------------------------------------------')
    logger.red(`$shark register report:`)
    logger.green(`Parse [${cmd}] successfully!`)
    logger.green(`Use the shark home page:[${SHARK_HOME}]`)
    logger.green(`${SUCCESS_MESSAGE} *@_@*!`)
    logger.green(`${SPONSOR_MESSAGE}`)
    logger.white('------------------------------------------------------------------')
}

module.exports = {
    register
};