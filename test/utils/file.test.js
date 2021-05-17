const fs = require('fs-extra');
const path = require('path');

const replacer = require('../../lib/utils/replace.variables');

const packageJson = require('./packageInfo');

const {
    SHARK_HOME
} = require('../../lib/utils/constants');

const parent = `${SHARK_HOME}${path.sep}.__shark_project_template_temp_dir`;
const templateParentDir = `${parent}${path.sep}project-template`;

describe('outputFileSync()', function () {
    doCreate(templateParentDir)
});


async function doCreate(templateParentDir) {
    let promise = recursiveSearchSync(templateParentDir)
    promise.then((files) => {
        console.dir(files)
        console.log('-------------------------resolve:' + files)
    }).catch((error) => {
        console.log('-------------------------reject:' + error)
    });
}

function recursiveSearchSync(filePath) {
    let projectdir = `${packageJson['projectDir']}${path.sep}${packageJson['project']}`
    return new Promise((resolve, reject) => {

        fs.readdir(filePath, function (err, files) {
            if (err) {
                console.warn(err)
                reject([])
            } else {
                files.forEach(function (filename) {
                    var filedir = path.join(filePath, filename);
                    // fs.Stats
                    fs.stat(filedir, function (eror, stats) {
                        if (eror) {
                            console.warn('获取文件stats失败');
                        } else {
                            var isFile = stats.isFile();
                            var isDir = stats.isDirectory();
                            if (isFile) {
                                let fileName = `${projectdir}${path.sep}${filedir.substr(81)}`
                                fileName = fileName.replace('project-template', `${packageJson['project']}`)
                                // console.log(`${fileName}`)
                                fileName = fileName.replace('com\\djc\\protemp', packageJson['__package__path__'])
                                let fileContent = fs.readFileSync(filedir, 'utf8')
                                fileContent = replacer.replaceVariables(fileContent, packageJson)
                                fs.outputFileSync(fileName, fileContent)
                                console.log(`create the file:${fileName} successfully...`)
                            }
                            if (isDir) {
                                recursiveSearchSync(filedir);
                            }
                        }
                    })
                });
                resolve([])
            }
        });
    })
}