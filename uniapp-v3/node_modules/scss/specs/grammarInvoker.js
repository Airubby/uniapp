var sys = require('sys'),
    fs = require('fs'),
    ometa = require('ometa'),
    creatingParser = false;

var fixReadFile = function(rawFile) {
  return rawFile.slice(1).replace(/\\n/g, '\n');
};

var createParser = function(parserInitializer) {
  if(!creatingParser) {
    creatingParser = true;
    //fs.readFile(__dirname + '/../src/cssSelector.ometa', 'utf8', function(err, contents) {
    fs.readFile(__dirname + '/../../ometa-js/newLineGrammar.ometa', 'utf8', function(err, contents) {
      if(err) {
        parserInitializer.setParser(err);
      } else {
        ometa.createParser(fixReadFile(contents), parserInitializer.setParser);
      }
      creatingParser = false;
    });
  }
};

var parserInitializer = (function() {
  var createdParser,
      parserErr,
      queuedCallbacks = [],
      that = {};

  that.setParser = function(err, parser) {
    parserErr = err;
    createdParser = parser;
    queuedCallbacks.forEach(function(callback) {
      callback(parserErr, createdParser);
    });
    queuedCallbacks = [];
  };

  that.addCallback = function(callback) {
    if(parserErr || createdParser) {
      callback(parserErr, createdParser);
    } else {
      queuedCallbacks.push(callback);
      createParser(that);
    }
  };

  that.reset = function() {
    createdParser = null;
  };

  return that;
})();

var parse = function(selector, callback) {
  parserInitializer.addCallback(function(err, parser) {
    if(err) {
      callback(err);
    } else {
      parser.parse(selector, 'selectors_group', function(err, css) {
        if(err) {
          callback(err);
        } else {
          //callback(null, css.toString());
          callback(null, css.join(''));
        }
      });
    }
  });
};


module.exports.parse = parse;
module.exports.reset = parserInitializer.reset;
var ssss = 'a,\nb';
console.log(ssss);
parse(ssss, function(err, shiznit) {
  if(err) {
    console.log(err);
  }
  console.log(shiznit);
});
