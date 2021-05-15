const inquirer = require('inquirer');

const codes = ['gmsoft', 'zcj', 'xcj', 'djc']

/**
 * questions
 */
async function asking(config = {}) {
    let questions = [{
            type: 'list',
            name: 'code',
            message: '新建项目所属产品代号?',
            default: 'zcj',
            choices: codes
        },
        {
            type: 'input',
            name: 'name',
            message: '新建项目名称(stockapply,contract,org,...):',
            default: config['projectName'] ? config['projectName'].replace('-', '') : 'sharkapp'
        },
        {
            type: 'confirm',
            name: 'flowable',
            message: '是否需要内置工作流?',
            default: true
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
        projectName
    } = config

    let questions = []

    questions.push({
        type: 'input',
        name: 'package',
        message: '新建项目包名:',
        default: `com.${code}.${projectName.replace('-','.')}`
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