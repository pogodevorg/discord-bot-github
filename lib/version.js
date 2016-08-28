/* eslint-disable no-console*/

var pjson = require('../package.json');
console.log(pjson.version);
module.exports = pjson.version;
