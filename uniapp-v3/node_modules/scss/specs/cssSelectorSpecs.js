var vows = require('vows'),
    assert = require('assert'),
    selectorGrammar = require(__dirname + '/grammarInvoker');

var shouldParse = function() {
  var selector,
      context = {
        topic: function() {
          selector = this.context.name;
          selectorGrammar.parse(selector, this.callback);
        }
      };

  context['should parse selector'] = function(err, parsedSelector) {
    if(err) {
      assert.fail(err.inner.toString());
    } else {
      assert.equal(parsedSelector, selector);
    }
  };

  return context;
};

var shouldParseTo = function(expectedSelector) {
  var context = {
        topic: function() {
          var selector = this.context.name;
          selectorGrammar.parse(selector, this.callback);
        }
      };

  context['should parse selector'] = function(err, parsedSelector) {
    if(err) {
      assert.fail(err.inner.toString());
    } else {
      assert.equal(parsedSelector, expectedSelector);
    }
  };

  return context;
};

vows.describe('Summarized Selectors').addBatch({
  // Taken from http://www.w3.org/TR/css3-selectors/#selectors

  '*': shouldParse(),
  'E': shouldParse(),
  'E[foo]': shouldParse(),
  'E[foo="bar"]': shouldParse(),
  'E[foo~="bar"]': shouldParse(),
  'E[foo^="bar"]': shouldParse(),
  'E[foo$="bar"]': shouldParse(),
  'E[foo*="bar"]': shouldParse(),
  'E[foo|="en"]': shouldParse(),
  'E:root': shouldParse(),
  'E:nth-child(n)': shouldParse(),
  'E:nth-last-child(n)': shouldParse(),
  'E:nth-of-type(n)': shouldParse(),
  'E:nth-last-of-type(n)': shouldParse(),
  'E:first-child': shouldParse(),
  'E:last-child': shouldParse(),
  'E:first-of-type': shouldParse(),
  'E:last-of-type': shouldParse(),
  'E:only-child': shouldParse(),
  'E:only-of-type': shouldParse(),
  'E:empty': shouldParse(),
  'E:link': shouldParse(),
  'E:visited': shouldParse(),
  'E:active': shouldParse(),
  'E:hover': shouldParse(),
  'E:focus': shouldParse(),
  'E:target': shouldParse(),
  'E:lang(fr)': shouldParse(),
  'E:enabled': shouldParse(),
  'E:disabled': shouldParse(),
  'E:checked': shouldParse(),
  'E::first-line': shouldParse(),
  'E::first-letter': shouldParse(),
  'E::before': shouldParse(),
  'E::after': shouldParse(),
  'E.warning': shouldParse(),
  'E#myid': shouldParse(),
  'E:not(s)': shouldParse(),
  'E F': shouldParse(),
  'E > F': shouldParse(),
  'E + F': shouldParse(),
  'E ~ F': shouldParse()
}).run();


vows.describe('Lonely Selectors').addBatch({
  // Taken from http://www.w3.org/TR/css3-selectors/#selectors,
  // but without the element names

  '[foo]': shouldParse(),
  '[foo="bar"]': shouldParse(),
  '[foo~="bar"]': shouldParse(),
  '[foo^="bar"]': shouldParse(),
  '[foo$="bar"]': shouldParse(),
  '[foo*="bar"]': shouldParse(),
  '[foo|="en"]': shouldParse(),
  ':root': shouldParse(),
  ':nth-child(n)': shouldParse(),
  ':nth-last-child(n)': shouldParse(),
  ':nth-of-type(n)': shouldParse(),
  ':nth-last-of-type(n)': shouldParse(),
  ':first-child': shouldParse(),
  ':last-child': shouldParse(),
  ':first-of-type': shouldParse(),
  ':last-of-type': shouldParse(),
  ':only-child': shouldParse(),
  ':only-of-type': shouldParse(),
  ':empty': shouldParse(),
  ':link': shouldParse(),
  ':visited': shouldParse(),
  ':active': shouldParse(),
  ':hover': shouldParse(),
  ':focus': shouldParse(),
  ':target': shouldParse(),
  ':lang(fr)': shouldParse(),
  ':enabled': shouldParse(),
  ':disabled': shouldParse(),
  ':checked': shouldParse(),
  '::first-line': shouldParse(),
  '::first-letter': shouldParse(),
  '::before': shouldParse(),
  '::after': shouldParse(),
  '.warning': shouldParse(),
  '#myid': shouldParse(),
  ':not(s)': shouldParse()
}).run();


vows.describe('Attribute Selectors with Identifiers').addBatch({
  '[foo~=bar]': shouldParse(),
  '[foo^=bar]': shouldParse(),
  '[foo$=bar]': shouldParse(),
  '[foo*=bar]': shouldParse(),
  '[foo|=en]': shouldParse()
}).run();


vows.describe('Nth Selectors').addBatch({
  ':nth-child(-n)': shouldParse(),
  ':nth-child(+n)': shouldParse(),

  ':nth-child(even)': shouldParse(),
  ':nth-child(odd)': shouldParse(),

  ':nth-child(50)': shouldParse(),
  ':nth-child(-50)': shouldParse(),
  ':nth-child(+50)': shouldParse(),

  ':nth-child(2n+3)': shouldParse(),
  ':nth-child(2n-3)': shouldParse(),
  ':nth-child(+2n-3)': shouldParse(),
  ':nth-child(-2n+3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child( 2n + 3 )': shouldParseTo(':nth-child(2n + 3)')
}).run();


vows.describe('Negation Selectors').addBatch({
  ':not(foo|bar)': shouldParse(),
  ':not(*|bar)': shouldParse(),

  ':not(foo|*)': shouldParse(),
  ':not(*|*)': shouldParse(),

  ':not(#blah)': shouldParse(),
  ':not(.blah)': shouldParse(),

  ':not([foo])': shouldParse(),
  ':not([foo^="bar"])': shouldParse(),
  ':not([baz|foo~="bar"])': shouldParse(),

  ':not(:hover)': shouldParse(),
  ':not(:nth-child(2n + 3))': shouldParse(),

  // Not technically allowed, but what the heck
  ':not(:not(#foo))': shouldParse(),
  ':not(a#foo.bar)': shouldParse(),
  ':not(#foo .bar > baz)': shouldParse(),
  ':not(h1, h2, h3)': shouldParse()
}).run();


vows.describe('moz-any Selector').addBatch({
  ':-moz-any(h1, h2, h3)': shouldParse(),
  ':-moz-any(.foo)': shouldParse(),
  ':-moz-any(foo bar, .baz > .bang)': shouldParse()
}).run();


vows.describe('Namespaced Selectors').addBatch({
  'foo|E': shouldParse(),
  '*|E': shouldParse(),
  'foo|*': shouldParse(),
  '*|*': shouldParse()
}).run();



vows.describe('Namespaced Attribute Selectors').addBatch({
  '[foo|bar=baz]': shouldParse(),
  '[*|bar=baz]': shouldParse(),
  '[foo|bar|=baz]': shouldParse()
}).run();


vows.describe('Comma Selectors').addBatch({
  'E, F': shouldParse(),
  'E F, G H': shouldParse(),
  'E > F, G > H': shouldParse()
}).run();


vows.describe('Selectors with Newlines').addBatch({
  "E,\nF": shouldParse(),
  "E\nF": shouldParse(),
  "E, F\nG, H": shouldParse()
}).run();


vows.describe('Expression Fallback Selectors').addBatch({
  '0%': shouldParse(),
  '60%': shouldParse(),
  '100%': shouldParse(),
  '12px': shouldParse(),
  '"foo"': shouldParse()
}).run();


vows.describe('Functional Pseudo Selectors').addBatch({
  ':foo("bar")': shouldParse(),
  ':foo(bar)': shouldParse(),
  ':foo(12px)': shouldParse(),
  ':foo(+)': shouldParse(),
  ':foo(-)': shouldParse(),
  ':foo(+"bar")': shouldParse(),
  ':foo(-++--baz-"bar"12px)': shouldParse()
}).run();


vows.describe('Selector Hacks').addBatch({
  '> E': shouldParse(),
  '+ E': shouldParse(),
  '~ E': shouldParse(),
  '> > E': shouldParse(),
  '>> E': shouldParseTo('> > E'),
  'E*': shouldParse(),
  'E*.foo': shouldParse(),
  'E*:hover': shouldParse()
}).run();
