var sys = require('sys'),
    fs = require('fs'),
    ometa = require(__dirname + '/index.js');
    rawGrammar = "ometa T <: Parser { t = '\n' -> 'wtf', a = (t | anything)* }";

var parse = function(grammar, stringToParse, rule) {
  ometa.createParser(grammar, function(err, parser) {
    if(err) {
      sys.puts(err.inner.toString());
    } else {
      parser.parse('ican\'t\ndothis\n', 'a', function(err, result) {
        if(err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  });
};

var compare = function() {
  var rawFile = fs.readFileSync(__dirname + '/newLineGrammar.ometa', 'utf8'),
      file = rawFile.slice(1).replace(/\\n/g, '\n'),
      maxChars = file.length >= rawGrammar.length ? file.length : rawGrammar.length,
      i;
  parse(file);
  for(i = 0; i < maxChars; i += 1) {
    console.log(file[i] + ' :: ' + rawGrammar[i]);
  }
};

module.exports.parse = parse;
parse(rawGrammar);
compare();
