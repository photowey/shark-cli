#!/usr/bin/env node

'use strict';

const program = require('commander');
const path = require('path');
const chalk = require('chalk')

const shark = require('../lib/cmds/deploy');

// Define the options with default values.
program
    .usage(
        ':: shark deploy -b <branch:trunk> -e <environment:test> -m <machineRoom:zcj>\n' +
        chalk.red('shark deploy -b trunk -e test -m zcj\n') +
        chalk.red(' OR\n') +
        chalk.red('shark deploy == shark deploy -b trunk -e test -m zcj')
    )
    .option('-b, --branch <branch>', 'branch', 'trunk')
    .option('-e, --env <environment>', 'environment', 'test')
    .option('-m, --machine <machineRoom>', 'the target of deploy machine room', 'zcj');

// Parse argv.
program.parse(process.argv)

// The cmd name
const cmdName = program.name().replace('-', ' ')

// Get options.
const options = program.opts();

// Retrieve single option with default value.
const branch = options.branch || path.normalize('trunk');
const env = options.env || path.normalize('test');
const machineRoom = options.machine || path.normalize('zcj');

const config = {
    os: process.env.OS,
    name: cmdName,
    branch,
    env,
    machineRoom,
    program
}

// Run deploy()
shark.deploy(config);