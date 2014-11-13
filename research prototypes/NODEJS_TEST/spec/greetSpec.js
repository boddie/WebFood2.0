// Uses jasmine for unit testing

// Directive that prevents the use of undeclared variables
// also prevents multiple declarations in same scope, 
// duplicate params, etc "http://www.w3schools.com/js/js_strict.asp"
'use strict'

// location of tested function
var greet = require('../src/greet');

// 'describe' blocks describes several behaviors of a function
describe('Checks the greet function', function() {
	// 'it' blocks describe a single behavior within a function
	it('should greet the given name', function() {
		expect(greet('Joe')).toEqual('Hello Joe!');
	});
	
	it('should greet no-one special if no name is given', function() {
		expect(greet()).toEqual('Hello world!');
	});
});