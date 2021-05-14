/**
 * $ shark register cmd handler.
 */

const path = require('path');
const fs = require('fs')
const os = require('os')

const {
    logger
} = require('../../logger')

const sharkHomeDir = `${os.homedir()}\\.shark`
const sharkDB = `${sharkHomeDir}\\db.json`

function register(config) {
    _init()
    const {
        cmd,
        projectCode,
        projectName,
        projectPath,
        program
    } = config

    const projectDir = projectPath ? path.resolve(process.cwd(), path.normalize(projectPath)) : process.cwd();
    // TODO 读取文件
    let projects = []
    
    const project = new Project(projectCode, projectName, projectDir)
    projects.push(project)

    fs.writeFile(sharkDB, JSON.stringify(new SharkDB(projects), "", 4), 'UTF-8', (err) => {
        if (err) {
            logger.info('write file error:' + err)
        }
    })
}

async function appendFileSyncIfNecessary(target) {
    return new Promise((resolve, reject) => {
        fs.existsSync(target, (err) => {
            if (err) {
                fs.appendFileSync(target, JSON.stringify(new SharkDB([]), '', 4), 'UTF-8', (err) => {
                    if (err) {
                        logger.info('create the file:[' + target + '] error')
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        })
    })
};

async function _init() {

    if (!fs.existsSync(sharkHomeDir)) {
        fs.mkdir(sharkHomeDir, (err) => {
            if (err) {
                logger.info('mkdir error:' + err)
            }
        })
    }

    let promimse = appendFileSyncIfNecessary(`${sharkDB}`)
    promimse.then((value) => {
        logger.info('init successfully...')
    }, (reason) => {
        logger.info('init error...' + reason)
    })
}

/**
 * The $shark DB.
 */
class SharkDB {
    constructor(projects) {
        this.projects = projects
    }
}

/**
 * The Project.
 */
class Project {
    constructor(code, name, dir) {
        this.code = code
        this.name = name
        this.dir = dir
    }
}

module.exports = {
    register
};