/**
 * $ shark commons.
 */

const os = require('os');
const path = require('path');

/**
 * Cli name.
 */
const CLI_NAME = 'shark';
/**
 * db.json.
 */
const DB_NAME = 'db.json';

/**
 * Success message.
 */
const SUCCESS_MESSAGE = 'Congratulations, Shark execution is complete!';

/**
 * Sponsor message.
 */
const SPONSOR_MESSAGE = 'Sponsored with ❤️ by <photowey@gmail.com>.';

/**
 * Shark home.
 */
const SHARK_HOME = `${os.homedir()}${path.sep}.${CLI_NAME}`;

/**
 * Shark db.
 */
const SHARK_DB = `${SHARK_HOME}${path.sep}${DB_NAME}`;

/**
 * Svn branches
 */
const BRANCHES = ['trunk', 'current']

/**
 * The evns
 */
const EVNS = ['dev', 'dev1', 'test', 'show', 'test1', 'syh', 'pro']

/**
 * The target machine room.
 */
const MACHINES = ['zcj', 'xcj', 'glxt']

/**
 * The product codes
 */
const PRODUCT_CODES = ['gmsoft', 'zcj', 'xcj', 'djc']

/**
 * The project-template file name.
 */
const PROJECT_TEMPLATE_NAME = 'project-template'

module.exports = {
    CLI_NAME,
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE,
    SHARK_HOME,
    SHARK_DB,
    BRANCHES,
    EVNS,
    MACHINES,
    PRODUCT_CODES,
    PROJECT_TEMPLATE_NAME
};