var ometa = require('./ometa-node'); 

var createParser = function(grammar, parserCallback) {
  var parser;
  try {
    parser = ometa(grammar);
    parserCallback(null, {
      parse: function(code, rule, callback) {
        callback(null, parser(code, rule));
      }
    });
  }
  catch(err) {
    parserCallback({
      inner: err
    });
  }
};

module.exports.createParser = createParser;
