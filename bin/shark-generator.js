#!/usr/bin/env node

'use strict';

/**
 * $ shark generator cmd handler.
 */

const program = require('commander');
const chalk = require('chalk')
const path = require('path');

const shark = require('../lib/cmds/generator');

// Define the options with default values.
program
    .usage(
        chalk.cyan('\n$ shark generator:\n') +
        chalk.green('$ shark generator -p <project>\n') +
        chalk.green('$ shark generator -p zcj-contract\n') +
        chalk.red('OR\n') +
        chalk.green('$ shark create -p zcj-contract')
    )
    .option('-p,--project <project>', 'the name of project')
    .option('--path <project-path>', 'the path of the will be created project')
    .option('-d,--database <database>', 'the target database for reverse engineering')

// Parse argv.
program.parse(process.argv)

// The cmd name.
const cmd = program.name().replace('-', ' ')

// Get options.
const options = program.opts();

// Retrieve single option with default value.
let project = program.args[0] ? program.args[0] : options.project;

const database = options.database;
const projectPath = options.path;

const projectDir = projectPath ? path.resolve(process.cwd(), path.normalize(projectPath)) : process.cwd();

const config = {
    cmd,
    project,
    projectDir,
    database: database
}

// Run asyncGenerate()
shark.asyncGenerate(config)