# scss-js
## A JavaScript implementation of SCSS (Sassy CSS)

## API

### Connect Compiler

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

The compile function takes a string and returns another string with the file's css.

## Where Does the Project Stand?

### What's Usable?
  * CSS Selectors
  * Nested Rules
  * Variables
  * Fixed Mixins

### What Needs Work?
  * CSS Selectors
  * Variable and Mixin names

### What's Unimplemented?
  * Parameterized Mixins
  * Functions

## Next Release (0.2.0)

Full CSS Selector implementation


## Special Thanks

I would like to give special thanks to [Hampton Catlin](http://hamptoncatlin.com),
[Nathan Weizenbaum](http://nex-3.com), and [Chris Eppstein](http://acts-as-architect.blogspot.com)
for starting and continuing the haml and sass project. I'd also like to thank the rest of the people
that have contributed to [Sass](http://sass-lang.com/) and I hope I can catch up to your
awesomeness.

## Modified MIT License

Copyright (c) 2010 Brian Mavity 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

Except as contained in this notice, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
