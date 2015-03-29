#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */

var PushBullet = require('pushbullet')
    , cmd = require('commander')
    , fs = require('fs')
    , Table = require('easy-table')
    ;

/**
 * CLI
 */

cmd
    .version(require('./package.json').version)
    .description('PushBullet CLI Client')
    .usage('[options] [body]')
    .option('--title <title>', 'Specify a title')
    .option('--devices', 'List registered devices')
    .option('-d, --device <device>', 'Push to a device')
    .option('--key <key>', 'Set API key') // TODO make this optional. Print value if no arg
    .option('--test', 'Debug. Print arguments and exit.')
    .parse(process.argv);

/**
 * Setup
 */

// Get user data folder
var userData = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preference' : '/var/local');
var configPath = userData + '/.pbcli';

if (cmd.key) {
    try {
        fs.writeFileSync(configPath, 'API_KEY=' + cmd.key);
        console.info('API key set')
    } catch (err) {
        throw err;
    }
    return;
}

// Check if config exists
try {
    fs.accessSync(configPath, fs.R_OK);
} catch (err) {
    console.error('[ERROR] No API key specified')
    console.info('Run pushbullet --key <key> to set your key')
    process.exit(9);
}

// Load config
require('dotenv').config({path: configPath});

// Init PushBullet
var push = new PushBullet(process.env.API_KEY);

/**
 * Main
 */

// List registered devices
if (cmd.devices) {
    console.info('Getting list of registered devices', '\n');

    push.devices(function (err, res) {
        if (err) {
            console.error('[ERROR] Failed to get devices', err)
            process.exit();
        }

        var table = new Table;

        for (let device of res.devices) {
            table.cell('ID', device.iden);
            table.cell('Name', device.nickname);
            table.newRow();
        }

        console.log(table.toString());
    });

    return;
}

var notification = {
    device: cmd.device || {},
    title: cmd.title || '',
    body: cmd.args.shift() || ''
};

// Output notification object and exit
if (cmd.test) {
    console.log(notification);
    process.exit();
}

// Push the notification to the service
push.note(notification.device, notification.title, notification.body, function (err) {
    if (err) {
        console.error('[ERROR] Push failed', err)
    }
});

return;