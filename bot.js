var forky = require('forky');
var path = require('path');
var config = require("./config/auth.js");

forky({path: path.join(__dirname, '/lib/workers/event.js'), workers: config.web.workers});
