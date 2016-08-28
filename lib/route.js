/* eslint prefer-reflect: ["error", { "exceptions": ["call"] }]*/
/* eslint-disable func-style, vars-on-top*/

function wrapHandler(path, cb) {
  return function (req, res, next) {
    if (req.url === path) {
        return cb(req, res);
    }

    return next();
  };
}

function notFoundHandler(req, res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('No Path found');
  res.end();
}

function compose(mw) {
  return function (req, res) {
    let next = function () {
      notFoundHandler.call(this, req, res);
    };

    let i = mw.length;
    while (i) {
      i -= 1;
      let thisMiddleware = mw[i];
      let nextMiddleware = next;
      next = function () {
        thisMiddleware.call(this, req, res, nextMiddleware);
      };
    }

    return next();
  };
}

module.exports = {
  wrap: wrapHandler,
  comp: compose
};
