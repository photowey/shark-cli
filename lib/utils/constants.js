/**
 * $ shark commons.
 */

const os = require('os')

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
const SHARK_HOME = `${os.homedir()}\\.${CLI_NAME}`;

/**
 * Shark db.
 */
const SHARK_DB = `${SHARK_HOME}\\${DB_NAME}`;

module.exports = {
    CLI_NAME,
    SUCCESS_MESSAGE,
    SPONSOR_MESSAGE,
    SHARK_HOME,
    SHARK_DB
};