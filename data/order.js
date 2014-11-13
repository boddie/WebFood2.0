var q = require('q');
var debug = require('debug')('webfood:orderdoa');

module.exports = function(db) {
	var Order = db.collection('orders');
	
	var createOrder = function (location, price, entree, bev, sides, other) {
		var deferred = q.defer();
		
		debug("Creating order");
		
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
			deferred.resolve(documents);
		});

		return deferred.promise;
	};
	
	var closeOrder = function (id) {
	
		var deferred = q.defer();
		
		debug("Creating order");

		Order.update({ id: id }, { $set: { status: 'closed' } }, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Close order success');
			deferred.resolve(documents);
		});
		
		return deferred.promise;
	};
	
	var cancellOrder = function (id) {
	
		var deferred = q.defer();
		
		debug("Cancelling order");

		Order.update({ id: id }, { $set: { status: 'cancelled' } }, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Cancel order success');
			deferred.resolve(documents);
		});
		
		return deferred.promise;
	};
	
	var getLocationOrders = function (location) {
	
		var deferred = q.defer();
		
		debug("Getting locations for:", location);

		Order.find({ 'location': location }).toArray(function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Pulled orders successfully');
			deferred.resolve(documents);
		});
		
		return deferred.promise;
	};
	
	return {
		createOrder : createOrder,
		closeOrder : closeOrder,
		cancellOrder : cancellOrder,
		getLocationOrders : getLocationOrders
	};
};