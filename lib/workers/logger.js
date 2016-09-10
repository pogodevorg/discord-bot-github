/* eslint no-undef: [0] */
/* eslint init-declarations: [0] */

var fs = require('fs');
var config = require('../../config/auth');

function format(fmt, obj, named) {
    if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match) {
            return String(obj[match.slice(2, -2)]);
        });
    }

    return fmt.replace(/%s/g, function() {
        return String(obj.shift());
    });
}

function logger(message) {
    var filename = '%s/log-%s-%s-%s.txt',
        now = new Date(),
        out;
    filename = format(filename, [config.github.logspath || './logs', now.getFullYear(), now.getMonth() + 1, now.getDate()]);
    out = new fs.WriteStream(filename, {
        'flags': 'a+',
        'encoding': 'utf-8',
        'mode': 0666
    });
    out.write(format('%s: %s\n', [now.toTimeString(), message]));
}

function err(message) {
    var filename = '%s/error.log',
        now = new Date(),
        out;
    filename = format(filename, [config.github.errorpath || config.github.logspath || './logs']);
    out = new fs.WriteStream(filename, {
        'flags': 'a+',
        'encoding': 'utf-8',
        'mode': 0666
    });
    out.write(format('%s: %s\n', [now.toTimeString(), message]));
}

module.exports = {
    log: logger,
    debug: err
};
