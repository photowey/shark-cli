const program = require('commander');
const path = require('path');

const shark = require('../lib/cmds/deploy');

program
    .option('-b, --branch <branch>', 'branch')
    .option('-e, --env <environment>', 'environment')
    .option('-m, --machine <machine-room>', 'the target of deploy machine room')
    .parse(process.argv);

// 获取 项目地址
const projectDir = program.args[0]
    ? path.resolve(process.cwd(), path.normalize(program.args[0]))
    : process.cwd();

// 获取目标地址 默认:D:\shark-cli-ws (os=win)
const branch = program.branch || path.normalize('trunk');
const env = program.env || path.normalize('test');
const machineRoom = program.dist || path.normalize('zcj');

// 构造 deploy() config 参数
let config = { branch, env, machineRoom, program }

shark.deploy(config);