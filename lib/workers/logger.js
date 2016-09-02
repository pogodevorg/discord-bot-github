var fs = require('fs');
var START = new Date();

function format(fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match) {
        return String(obj[match.slice(2, -2)]);
      });
    } else {
        return fmt.replace(/%s/g, function() {
          return String(obj.shift());
        });
    }
}

function logger(message) {
	var filename = '../../logs/%s-%s-%s-%s.txt',
		now = new Date(),
		out;
	filename = format(filename, ['log', now.getFullYear(), now.getMonth() + 1, now.getDate()]);
	out = new fs.WriteStream(filename, {
		'flags': 'a+',
		'encoding': 'utf-8',
		'mode': '0666'
	});
	out.write(format('%s: %s\n', [now.toTimeString(), message]));
}

module.exports = {
  log: logger
};
