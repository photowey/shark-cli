#!/usr/bin/env node

'use strict';

/**
 * $ shark cmd handler.
 */

const program = require('commander')
const packageJson = require('../package.json')

/**
 * Shark cli.
 */
program
    .version(packageJson.version, '-v, --version')
    .usage('<command> [options]')
    .command('deploy', 'deploy the prgram')
    .command('register', 'register the project directory')
    .command('create', 'create a backend micro-service project')

// Parse the args.
program.parse(process.argv)