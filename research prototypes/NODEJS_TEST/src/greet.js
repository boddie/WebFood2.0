'use strict';

// Returns 'Hello <name>!" if name is not null
// Otherwise returns "Hello world!"
var greet = function(name) {
	if (name === undefined) {
		name = 'world';
	}
	return 'Hello ' + name + '!';
};

// Allows outside js files to use this function
module.exports = greet;
