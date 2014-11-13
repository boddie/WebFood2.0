// Uses jasmine for unit testing
// TO TEST: ./node_modules/jasmine-node/bin/jasmine-node tests/orderSpec.js

// Directive that prevents the use of undeclared variables
// also prevents multiple declarations in same scope, 
// duplicate params, etc "http://www.w3schools.com/js/js_strict.asp"
'use strict';

// location of tested function
var order = require('../data/order');

describe('Testing the order.js methods', function() {

	it('Create order should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.createOrder(12, "test_location", 1.23, "test_entree", "test_bev", { side1: "side_1", side2: "side_2" })
			.then(function (res) {
				expect(res[0].id).toEqual(12);
				expect(res[0].location).toEqual('test_location');
				done();
			});
		});
	});
	
	it('Close order should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.closeOrder(12)
			.then(function (res) {
				expect(res).toEqual(1);
				db.close();
				done();
			});
		});
	});
	
	
});