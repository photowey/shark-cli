#!/usr/bin/env node

'use strict';

/**
 * $ shark cmd handler.
 */

const program = require('commander');
const fs = require('fs-extra');

const packageJson = require('../package.json');
const {
    logger
} = require('../lib/logger');

const {
    SHARK_HOME,
    SHARK_DB,
    BRANCHES,
    EVNS,
    MACHINES
} = require('../lib/utils/constants');

const {
    SharkDB
} = require('../lib/model/register.model');

/**
 * Ensure home dir && db file.
 */
__init__()

/**
 * Shark cli.
 */
program
    .version(packageJson.version, '-v, --version')
    .usage('<command> [options]')
    .command('deploy', 'deploy the prgram')
    .command('register', 'register the project directory')
    .command('create', 'create a backend micro-service project')

// Test logger debug?
logger.init(program)

// Parse the args.
program.parse(process.argv);

// =====================================================
function __init__() {
    ensureHomeDir()
    ensureSharkDB()
}

function ensureHomeDir() {
    try {
        fs.ensureDir(SHARK_HOME)
    } catch (error) {}
}

function ensureSharkDB() {
    try {
        fs.readFileSync(`${SHARK_DB}`, 'UTF-8');
    } catch (error) {
        let db = new SharkDB([])
        db['branches'] = BRANCHES
        db['evns'] = EVNS
        db['machines'] = MACHINES
        fs.outputFileSync(SHARK_DB, JSON.stringify(db, "", 4))
    }
}