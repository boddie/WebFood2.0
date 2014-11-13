// Promise library used for asynchronous calls
var q = require('q');
// Debug library... to use start node with "DEBUG=*"
var debug = require('debug')('webfood:orderdoa');

// These methods are exported after the database parameter 'db'
// has been established
module.exports = function(db) {
	// The orders or under the MongoDB 'orders' document collection
	var Order = db.collection('orders');
	
	// This method is used for a student who adds a new order 
	// for a vendor to make (i.e. order status is 'new')
	//     @param location - (string) the vendor
	//     @param price - (number) the total price of the order
	//     @param entree - (string) the selected entree
	//     @param bev - (string) the selected beverage
	//     @param sides - (an array)the selected sides for the order
	//     @param other - (an array)several menus have 'other'
	//                    optional setting which can be put here
	var createOrder = function (location, price, entree, bev, sides, other) {
		var deferred = q.defer(); // Part of q async library
		
		debug("Creating order");
		
		// Calls an 'insert' command on the MongoDB database
		// using parameters from function
		Order.insert({
			location: location,
			price: price,
			entree: entree,
			beverage: bev,
			sides: sides,
			other: other,
			status: 'new'
		}, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Registration success');
			deferred.resolve(documents); // Part of q async library
		});

		return deferred.promise; // Part of q async library
	};
	
	// After an order has been established by a student
	// when it is finished it will be closed by the vendor
	//     @param id - (Object id) Id of the order to close
	var closeOrder = function (id) {
		var deferred = q.defer(); // Part of q async library
		
		debug("Creating order");

		// Calls an 'update' command on the MongoDB database
		// using parameters from function
		Order.update({ id: id }, { $set: { status: 'closed' } }, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Close order success');
			deferred.resolve(documents); // Part of q async library
		});
		
		return deferred.promise; // Part of q async library
	};
	
	// After an order has been established by a student
	// the student or vendor may cancel the order before closed
	//     @param id - (Object id) Id of the order to cancel
	var cancellOrder = function (id) {
		var deferred = q.defer(); // Part of q async library
		
		debug("Cancelling order");

		// Calls an 'update' command on the MongoDB database
		// using parameters from function
		Order.update({ id: id }, { $set: { status: 'cancelled' } }, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Cancel order success');
			deferred.resolve(documents); // Part of q async library
		});
		
		return deferred.promise; // Part of q async library
	};
	
	// This is used so that a vendor can view all of the 
	// pending orders to be made. It returns all of the 
	// orders at their name location
	//     @param location - (String) the location name
	var getLocationOrders = function (location) {
		var deferred = q.defer(); // Part of q async library
		
		debug("Getting locations for:", location);

		Order.find({ 'location': location }).toArray(function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Pulled orders successfully');
			deferred.resolve(documents); // Part of q async library
		});
		
		return deferred.promise; // Part of q async library
	};
	
	// Returns the modules to export
	return {
		createOrder : createOrder,
		closeOrder : closeOrder,
		cancellOrder : cancellOrder,
		getLocationOrders : getLocationOrders
	};
};