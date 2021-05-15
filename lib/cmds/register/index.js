/**
 * $ shark register cmd handler.
 */

const path = require('path');
const fs = require('fs')

const {
    logger
} = require('../../logger')

const {
    SharkDB,
    Project
} = require('../../model/register.model');

const {
    SHARK_HOME,
    SHARK_DB,
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE
} = require('../../utils/constants')

/**
 * register()
 * @param {*} config 
 */
function register(config = {}) {
    const {
        cmd,
        projectCode,
        projectName,
        projectPath
    } = config

    const projectDir = projectPath ? path.resolve(process.cwd(), path.normalize(projectPath)) : process.cwd();
    // Load the db.
    let db = loadSharkDB()
    let projects = db['projects'] || []

    const project = new Project(projectCode, projectName, projectDir)
    projects.push(project)

    fs.writeFile(SHARK_DB, JSON.stringify(new SharkDB(projects), "", 4), 'UTF-8', (err) => {
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

/**
 * Load the shark db file(db.json).
 */
function loadSharkDB() {
    try {
        var data = fs.readFileSync(`${SHARK_DB}`, 'UTF-8');
        return JSON.parse(data.toString())
    } catch (err) {
        return new SharkDB([])
    }
}

module.exports = {
    register
};