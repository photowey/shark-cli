#!/usr/bin/env node

'use strict';

/**
 * $ shark cmd handler.
 */

const program = require('commander');
const fs = require('fs-extra');

const packageJson = require('../package.json');

const {
    SHARK_HOME
} = require('../lib/utils/constants');

/**
 * Ensure home dir.
 */
ensureHomeDir()

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
// Run create()
program.parse(process.argv)

// =====================================================

function ensureHomeDir() {
    try {
        fs.ensureDir(SHARK_HOME)
    } catch (error) {}
}