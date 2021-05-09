#!/usr/bin/env node

'use strict';

const program = require('commander')
const packageJson = require('../package.json')

/**
 * shark cli
 */
program
    .version(packageJson.version, '-v, --version')
    .usage('<command> [options]')
    .command('add', 'add', '-a, --add')
    .command('delete', 'delete', '-d, --delete')
    .command('list', 'list all', '-l, --list')
    .command('init', 'init', '-i, --init')

// parse the args
program.parse(process.argv)