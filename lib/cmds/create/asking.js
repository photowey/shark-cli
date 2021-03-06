const inquirer = require('inquirer');
const { logger } = require('../../logger');

const {
    loadSharkDB
} = require('../deploy/asking')

/**
 * questions
 */
async function asking(config = {}) {

    let db = loadSharkDB()

    let questions = [{
            type: 'list',
            name: 'code',
            message: '新建项目所属产品代号?',
            default: 'zcj',
            choices: db['codes']
        },
        {
            type: 'input',
            name: 'name',
            message: '新建项目名称(stockapply,contract,org,...):',
            default: config['project'] ? config['project'].replace('-', '') : 'sharkapp',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:项目名称!'
                } else {
                    return true
                }
            }
        },
        {
            type: 'confirm',
            name: 'flowable',
            message: '是否需要内置工作流?',
            default: true
        },
        {
            type: 'input',
            name: 'version',
            message: '版本号:',
            default: '1.0.0',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:版本号!'
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'author',
            message: '作者:',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:项目作者!'
                } else {
                    return true
                }
            }
        }
    ];

    return inquirer.prompt(questions).then(answers => ({
        ...answers
    }));
}

/**
 * Asking package.
 * @param {*} config 
 * @returns 
 */
async function packageAsking(config = {}) {
    let {
        code,
        project
    } = config

    let questions = []

    questions.push({
        type: 'input',
        name: '__package__',
        message: '新建项目包名:',
        default: `com.${code}.${project.replace(`${code}`,'').replace('-','')}`
    })

    return inquirer.prompt(questions).then(answers => ({
        ...answers
    }));
}

/**
 * The confirm of the input info of project.
 * @param {*} config 
 * @returns 
 */
async function confirmInput(config = {}) {
    let questions = []

    questions.push({
        type: 'confirm',
        name: 'flowable',
        message: '确认项目信息?',
        default: true
    })

    return inquirer.prompt(questions).then(answers => ({
        ...answers
    }));
}

module.exports = {
    asking,
    packageAsking,
    confirmInput
}