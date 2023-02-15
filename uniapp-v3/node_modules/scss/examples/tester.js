var sys = require('sys')
  , fs = require('fs')
  , path = require('path')
  , scss = require('../')
  ;

fs.readFile(path.join(__dirname, 'blog.scss'), function(err, scssFile) {
  scss.parse(scssFile.toString(), function(err, css) {
    if(err) {
      sys.puts(sys.inspect(err));
    } else {
      sys.puts(css);
    }
  });
});
