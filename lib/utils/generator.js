const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const {
    SHARK_HOME
} = require('../../lib/utils/constants')

const replacer = require('../../lib/utils/replace.variables');

const {
    logger
} = require('../../lib/logger');

const parent = `${SHARK_HOME}${path.sep}.__shark_project_template_temp_dir`
const templateParentDir = `${parent}${path.sep}project-template`

const PROJECT_TEMPLATE_NAME = 'project-template'

/**
 * Generate the Java code.
 * @param {*} answers 
 */
async function doGenerate(context) {
    await recursiveSearchSync(templateParentDir, context)
}

/**
 * Synchronously read the target-path，use recursive.
 * @param {*} templateParentDir 
 * @param {*} context 
 */
async function recursiveSearchSync(targetPath, context) {
    let {
        project,
        projectDir,
        __package_path__
    } = context

    let projectBaseDir = `${projectDir}${path.sep}${project}`
    fs.readdir(targetPath, function (err, files) {
        if (err) {
            logger.red(err)
        } else {
            files.forEach(function (filename) {
                var filedir = path.join(targetPath, filename);
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        logger.red('read the file failure.');
                    } else {
                        var isFile = stats.isFile();
                        var isDir = stats.isDirectory();
                        if (isFile) {
                            let fileName = `${projectBaseDir}${filedir.substr(81)}`
                            fileName = fileName.replace(PROJECT_TEMPLATE_NAME, `${project}`)
                            fileName = fileName.replace(`com${path.sep}djc${path.sep}protemp`, `${__package_path__}`)

                            // Read the Template file content.
                            let fileContent = fs.readFileSync(filedir, 'utf8')
                            // Replace the all placeholders.
                            fileContent = replacer.replaceVariables(fileContent, context)

                            // Write the file.
                            fs.outputFileSync(fileName, fileContent)
                            logger.info(`${chalk.cyan('| create')} | ${chalk.yellow(fileName.substr(46))}`)
                        }
                        if (isDir) {
                            recursiveSearchSync(filedir, context);
                        }
                    }
                })
            });
        }
    });
}

module.exports = {
    doGenerate
}