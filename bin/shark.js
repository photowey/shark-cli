#!/usr/bin/env node

'use strict';

const program = require('commander')
const packageJson = require('../package.json')

/**
 * Shark cli.
 */
program
    .version(packageJson.version, '-v, --version')
    .usage('<command> [options]')
    .command('deploy','deploy the prgram')

// Parse the args.
program.parse(process.argv)