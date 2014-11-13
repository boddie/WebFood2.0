// Uses jasmine for unit testing
// TO TEST: ./node_modules/jasmine-node/bin/jasmine-node tests/userSpec.js

// Directive that prevents the use of undeclared variables
// also prevents multiple declarations in same scope, 
// duplicate params, etc "http://www.w3schools.com/js/js_strict.asp"
'use strict';

// location of tested function
var user = require('../data/user');

// 'describe' blocks describes several behaviors within objects or functions...
// in this case it is testing functionality within the user module
// NOTE: closing the database happens only once at the end
describe('Testing the user.js methods', function() {

	// 'it' blocks describe a single behavior within a function

	// This block tests the functionality of the 'create' function
	// NOTE: The 'done' parameter is for jasmine to know when the test is done
	it('Create user should return success', function(done) { 
		require('../data/connection')(function(err, db) {
			var User = user(db);
			User.create("userName", "password")
			.then(function (res) { // .then is part of 'q' library returned promise
				//console.log(res);
				// Gets username of the user to make sure it is correct
				expect(res[0].username).toEqual('userName'); 
				// Gets password of the user to make sure it is correct
				expect(res[0].password).toEqual('password');
				
				done(); // Async returned so call 'done'
			});
		});
	});
	
	// This block tests the functionality of the 'getLocationOrders' function
	// NOTE: The 'done' parameter is for jasmine to know when the test is done
	it('Pulling user data should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var User = user(db);
			User.findOne({username: "userName"})
			.then(function (res) { // .then is part of 'q' library returned promise
				console.log(res);
				// Test that an username entered was the same userName returned
				expect(res.username).toEqual('userName');
				// Closes the database connection
				db.close();
				done(); // Async returned so call 'done'
			});
		});
	});
});