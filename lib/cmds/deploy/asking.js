const inquirer = require('inquirer');
const fs = require('fs-extra');

const {
    SharkDB,
} = require('../../model/register.model');

const {
    SHARK_DB,
    BRANCHES,
    EVNS,
    MACHINES,
    PRODUCT_CODES
} = require('../../utils/constants')

/**
 * Load the shark db file.
 */
function loadSharkDB() {

    let db = new SharkDB([])
    db['branches'] = BRANCHES
    db['evns'] = EVNS
    db['machines'] = MACHINES
    db['codes'] = PRODUCT_CODES

    try {
        var data = fs.readFileSync(`${SHARK_DB}`, 'UTF-8');
        return data ? JSON.parse(data.toString()) : db
    } catch (err) {
        console.error(err)
        return db
    }
}

/**
 * Asking some questions for deployment.
 */
async function asking(config = {}) {

    let db = loadSharkDB()

    let questions = []
    let branch = config['branch']
    let evn = config['evn']
    let machine = config['machineRoom']

    questions.push({
        type: 'input',
        name: 'code',
        message: '发布项目(this):',
        default: 'this',
        validate(value) {
            if (value === '') {
                return '(・∀・(・∀・(・∀・*)请输入:发布项目!'
            } else {
                return true
            }
        }
    })

    if (!branch) {
        questions.push({
            type: 'list',
            name: 'branch',
            message: '项目发布的分支?',
            default: 'trunk',
            choices: db['branches']
        })
    }
    if (!evn) {
        questions.push({
            type: 'list',
            name: 'evn',
            message: '分发部环境?',
            default: 'test',
            choices: db['evns']
        })
    }
    if (!machine) {
        questions.push({
            type: 'list',
            name: 'machine',
            message: '发布目标机房?',
            default: 'test',
            choices: db['machines']
        })
    }

    questions.push({
        type: 'confirm',
        name: 'release',
        message: '是否需要先发布到mavens私服?',
        default: true
    })

    questions.push({
        type: 'confirm',
        name: 'hot',
        message: '是否执行热发布?',
        default: true
    })

    questions.push({
        type: 'input',
        name: 'module',
        message: '发布模块(provider|sub-module):',
        default: 'provider',
        validate(value) {
            if (value === '') {
                return '(・∀・(・∀・(・∀・*)请输入:发布模块!'
            } else {
                return true
            }
        }
    })

    return inquirer.prompt(questions).then(answers => ({
        ...answers
    }));
}

module.exports = {
    asking,
    loadSharkDB
}