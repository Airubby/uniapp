var lib = require("./lib");
require("./ometa-base")
require("./parser")
require("./bs-js-compiler")
require("./bs-ometa-compiler")
require("./bs-ometa-optimizer")
require("./bs-ometa-js-compiler")

var translateCode = function(s) {
  var translationError = function(m, i) { alert("Translation error - please tell Alex about this!"); throw fail },
      tree             = BSOMetaJSParser.matchAll(s, "topLevel", undefined, function(m, i) { throw objectThatDelegatesTo(fail, {errorPos: i}) })
  return BSOMetaJSTranslator.match(tree, "trans", undefined, translationError)
}

var parse = function(grammarString) {
  var parser = eval(translateCode(grammarString));
  return function(stringToParse, rule) {
    return eval(parser.matchAll(stringToParse, rule));
  };
};


module.exports = parse;
