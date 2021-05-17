#!/usr/bin/env node

'use strict';

/**
 * $ shark deploy cmd handler.
 */

const program = require('commander');
const path = require('path');
const chalk = require('chalk')

const shark = require('../lib/cmds/deploy');

// Define the options with default values.
program
    .usage(
        chalk.red('\n$ shark deploy:\n') +
        chalk.green('$ shark deploy -b <branch> -e <environment> -m <machineRoom>\n') +
        chalk.green('$ shark deploy -b trunk -e test -m zcj\n') +
        chalk.green(' OR\n') +
        chalk.red('$ shark deploy == $ shark deploy -b trunk -e test -m zcj')
    )
    .option('-b, --branch <branch>', 'branch')
    .option('-e, --env <environment>', 'environment')
    .option('-m, --machine <machineRoom>', 'the target of deploy machine room');

// Parse argv.
program.parse(process.argv)

// The cmd name
const cmd = program.name().replace('-', ' ')

// Get options.
const options = program.opts();

// Retrieve single option with default value.
const branch = options.branch;
const env = options.env;
const machineRoom = options.machine;

const config = {
    cmd,
    branch,
    env,
    machineRoom,
    program
}

// Run deploy()
shark.deploy(config);