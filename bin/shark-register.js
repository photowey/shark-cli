#!/usr/bin/env node

'use strict';

/**
 * $ shark register cmd handler.
 */

const program = require('commander');
const chalk = require('chalk')

const ensure = require("../lib/cmds/register/ensure");
ensure.doEnsure()

const shark = require('../lib/cmds/register');

// Define the options with default values.
program
    .usage(
        chalk.red('\n$ shark register:\n') +
        chalk.green('$ shark register -p <project-code> -n <project-name> --path <path>\n') +
        chalk.green('$ shark register -p zcjcontract -n contract --path d:\\project\n')
    )
    .option('-p, --project <project-code>', 'the project code')
    .option('-n, --name <name>', 'the project name')
    .option('--path <path>', 'the directory of the project root');

// Parse argv.
program.parse(process.argv)

// The cmd name.
const cmd = program.name().replace('-', ' ')

// Get options.
const options = program.opts();

// Retrieve single option with default value.
const projectCode = options.project;
let projectName = options.name;
const projectPath = options.path;

// If,not found the --name option,the name will be equals the project-code 
if (!projectName) {
    projectName = projectCode
}

const config = {
    cmd,
    projectCode,
    projectName,
    projectPath,
    program
}

// Run register()
shark.register(config);