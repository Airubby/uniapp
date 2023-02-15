var scss = require('./index');

var compiler = (function() {
  return {
    match: /\.css$/,
    ext: '.scss',
    compile: function(str, fn) {
      scss.parse(str, function(err, css) {
        if(err) {
          fn(err);
        } else {
          fn(null, css);
        }
      });
    }
  };
})();


module.exports = compiler;
