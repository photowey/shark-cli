const inquirer = require('inquirer');

/**
 * Asking some questions for deployment.
 */
async function asking(config = {}) {
    let questions = []
    let projectCode = config['projectCode']
    let projectName = config['projectName']
    let projectPath = config['projectPath']

    if (!projectCode) {
        questions.push({
            type: 'input',
            name: 'projectCode',
            message: '项目(e.g.:zcj-contract):',
            default: 'zcj-contract',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:项目!'
                } else {
                    return true
                }
            }
        })
    }
    if (!projectName) {
        questions.push({
            type: 'input',
            name: 'projectName',
            message: '项目名称(e.g.:政采合同):',
            default: '政采合同',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:项目名称!'
                } else {
                    return true
                }
            }
        })
    }
    if (!projectPath) {
        questions.push({
            type: 'input',
            name: 'projectPath',
            message: '项目根目录(e.g.:<d:\\gmsot-ws\\zcj-contract>):',
            default: 'D:\\gmsoft-ws\\zcj-contract',
            validate(value) {
                if (value === '') {
                    return '(・∀・(・∀・(・∀・*)请输入:项目根目录!'
                } else {
                    return true
                }
            }
        })
    }

    return inquirer.prompt(questions).then(answers => ({
        ...answers
    }));
}

module.exports = {
    asking
}