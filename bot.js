var forky = require('forky');
var path = require('path');
var config = require('./config/auth.js');
var pkg = require('./package');
var semver = require('semver');

if (!semver.satisfies(process.version, pkg.engines.node)) {
    console.log('Requires a node version matching ' + pkg.engines.node);
    process.exit();
}

forky({
    path: path.join(__dirname, '/lib/workers/event.js'),
    workers: config.web.workers
});
