var sys = require('sys'),
    fs = require('fs'),
    compiler = require('../src/scssCompiler');

fs.readFile(__dirname + '/blog.scss', function(err, scssFile) {
  compiler.compile(scssFile.toString(), function(err, css) {
    if(err) {
      sys.puts(sys.inspect(err));
    } else {
      sys.puts(css);
    }
  });
});
