/* eslint no-process-exit: [0] */

var forky = require('forky');
var path = require('path');
var config = require('./config/auth.js');
var pkg = require('./package');
var semver = require('semver');

function misconfigured(err) {
    console.log(err);
    process.exit();
}

if (!semver.satisfies(process.version, pkg.engines.node)) {
    misconfigured('Requires a node version matching ' + pkg.engines.node + '\nCurrent is ' + process.version);
}

if (typeof config === 'undefined' || typeof config.github === 'undefined' || typeof config.discord === 'undefined' || typeof config.web === 'undefined') {
    misconfigured('Missing or horribly misconfigured auth.js');
}

if (typeof config.github.token === 'undefined') {
    misconfigured('Requires a github secret token in auth.js');
}

if (typeof config.discord.token === 'undefined') {
    misconfigured('Requires a Discord bot token in auth.js');
}

if (typeof config.discord.channelID === 'undefined') {
    misconfigured('Requires a Discord Channel ID in auth.js');
}

forky({
    path: path.join(__dirname, '/lib/workers/event.js'),
    workers: config.web.workers || 1
});
