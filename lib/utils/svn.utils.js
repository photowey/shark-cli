const fs = require('fs-extra');
const path = require('path');

const {
    SHARK_HOME
} = require('../../lib/utils/constants');

const svn = require('node-svn-ultimate');

const {
    logger
} = require('../../lib/logger')

const tempDir = path.resolve(`${SHARK_HOME}`, '.__shark_project_template_temp_dir');

/**
 * Fetch the template.
 * @param {*} svnUrl 
 * @param {*} forceSvnCheckout 
 * @returns 
 * @copyfrom https://github.com/gmsoft-happyCoding/stormrage/blob/master/lib/utils/fetchProject.js
 */
function fetchTemplate(svnUrl, forceSvnCheckout = true) {
    return new Promise((resolve, reject) => {
        const projectName = path.basename(svnUrl);
        const projectPath = path.join(tempDir, projectName);

        ensureFileSync(projectPath)

        if (forceSvnCheckout || !fs.existsSync(projectPath)) {
            fs.removeSync(projectPath);
            svn.commands.export(svnUrl, projectPath, function (err) {
                if (err) {
                    logger.red(`fetch the template:[${projectName}] failure... `)
                    console.log(err);
                    reject(err);
                    process.exit(1);
                }
                resolve({
                    tempDir,
                    projectName,
                    projectPath
                });
                logger.green(`fetch the template:[${projectName}] successfully... `)
            });
        } else {
            resolve({
                tempDir,
                projectName,
                projectPath
            });
        }
    });
};

function ensureFileSync(projectPath) {
    try {
        fs.ensureFileSync(projectPath)
    } catch (error) {}
}

module.exports = {
    fetchTemplate
};