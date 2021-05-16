#!/usr/bin/env node

'use strict';

/**
 * $ shark create cmd handler.
 */

const program = require('commander');
const chalk = require('chalk')
const path = require('path');

const shark = require('../lib/cmds/create');

// Define the options with default values.
program
    .usage(
        chalk.cyan('\n$ shark create:\n') +
        chalk.green('$ shark create <project> -p <project> -e <environment> -m <machineRoom>\n') +
        chalk.green('$ shark create zcj-contract -e test -m zcj\n') +
        chalk.red('OR\n') +
        chalk.green('$ shark create -p zcj-contract -e test -m zcj')
    )
    .option('-p,--project <project>', 'the name of project', 'shark-app')
    .option('--path <project-path>', 'the path of the was created project')
    .option('-e,--env <environment>', 'the environment when deploy the project', 'test')
    .option('-m,--machine <machineRoom>', 'the machine room when deploy the project, at first', 'zcj')

// Parse argv.
program.parse(process.argv)

// The cmd name.
const cmd = program.name().replace('-', ' ')

// Get options.
const options = program.opts();

// Retrieve single option with default value.
let project = program.args[0] ? program.args[0] : options.project;
let env = options.env;
const machineRoom = options.machine;

const projectPath = options.path;

const projectDir = projectPath ? path.resolve(process.cwd(), path.normalize(projectPath)) : process.cwd();

const config = {
    cmd,
    env,
    project,
    projectDir,
    machineRoom
}

// Run create()
shark.create(config)