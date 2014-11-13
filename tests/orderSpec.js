// Uses jasmine for unit testing
// TO TEST: ./node_modules/jasmine-node/bin/jasmine-node tests/orderSpec.js

// Directive that prevents the use of undeclared variables
// also prevents multiple declarations in same scope, 
// duplicate params, etc "http://www.w3schools.com/js/js_strict.asp"
'use strict';

// location of tested function
var order = require('../data/order');

// Id generated by MongoDB 
var _id;

describe('Testing the order.js methods', function() {

	it('Create order should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.createOrder("test_location", 1.23, "test_entree", "test_bev", { side1: "side_1", side2: "side_2" })
			.then(function (res) {
				_id = res[0].id;
				expect(res[0].location).toEqual('test_location');
				expect(res[0].price).toEqual(1.23);
				done();
			});
		});
	});
	
	it('Close order should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.closeOrder(_id)
			.then(function (res) {
				expect(res).toEqual(1);
				done();
			});
		});
	});
	
	it('Cancel order should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.cancellOrder(_id)
			.then(function (res) {
				expect(res).toEqual(1);
				done();
			});
		});
	});
	
	it('Pulling orders should return success', function(done) {
		require('../data/connection')(function(err, db) {
			var Order = order(db);
			Order.getLocationOrders('test_location')
			.then(function (res) {
				expect(res[0].entree).toEqual('test_entree');
				db.close();
				done();
			});
		});
	});
	
});