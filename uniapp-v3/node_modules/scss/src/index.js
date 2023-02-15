var sys = require('sys')
  , fs = require('fs')
  , path = require('path')
  , ometa = require('ometa')
  , rule = 'scssFile'
  , createdParser
  ;

var fixReadFile = function(rawFile) {
  return rawFile.slice(1).replace(/\\n/g, '\n');
};

var getParser = function(callback) {
  if(!createdParser) {
    fs.readFile(path.join(__dirname, '/CssSelector.ometa'), 'utf8', function(err, cssSelectorContents) {
      var selectorFile = fixReadFile(cssSelectorContents); 
      ometa.createParser(selectorFile, function(err, cssSelectorParser) {
        fs.readFile(path.join(__dirname, '/scss.ometa'), 'utf8', function(err, contents) {
          var contentFile = fixReadFile(contents); 
          if(err) {
            callback(err);
          } else {
            ometa.createParser(contentFile, function(err, parser) {
              if(err) {
                callback(err);
              } else {
                createdParser = parser;
                callback(null, createdParser);
              }
            });
          }
        });
      });
    });
  } else {
    callback(null, createdParser);
  }
};

var parse = function(scssFile, callback) {
  getParser(function(err, parser) {
    if(err) {
      callback(err);
    } else {
      parser.parse(scssFile, rule, function(err, css) {
        require(__dirname + '/prettyPrint').render(css, function(inner, printed) {
          callback(err, printed);
        });
      });
    }
  });
};


module.exports.parse = parse;
