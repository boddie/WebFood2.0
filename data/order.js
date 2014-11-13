var q = require('q');
var debug = require('debug')('webfood:userdao');

module.exports = function(db) {
	var Order = db.collection('orders');
	
	var createOrder = function (id, location, price, entree, bev, sides, other) {
		var deferred = q.defer();
		
		debug("Creating order");
		
		Order.insert({
			id: id,
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

		Order.update({ id: id }, { $set: { status: 'closed' } }, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Close order success');
			deferred.resolve(documents);
		});
		
		return deferred.promise;
	};
	
	return {
		createOrder : createOrder,
		closeOrder : closeOrder
	};
};

/*
var MongoClient = require('mongodb').MongoClient;

module.exports.createOrder = function(id, location, price, entree, bev, sides, other) {
	MongoClient.connect(
		'mongodb://boddie:password1@ds051110.mongolab.com:51110/se329p3',
		function(err, connection) {
			// Uses customer collection within se329p3 database
			var collection = connection.collection('orders');
			
			collection.insert({
				id: id,
				location: location,
				price: price,
				entree: entree,
				beverage: bev,
				sides: sides,
				other: other,
				status: 'new'
				}, function(err, count) {
					Console.Log("Count: ", count);
					connection.close();
					return count;
			});
		}
	);
};


/*
var db = require('./connection')(function (err, db) {
	var Order = require('mongolia').model(db, 'oders');
	
	module.exports.createOrder = function(id, location, price, entree, bev, sides, other) {
		var deferred = q.defer();
		Order.mongo('insert', {
			id: id,
			location: location,
			price: price,
			entree: entree,
			beverage: bev,
			sides: sides,
			other: other,
			status: 'new'
		}, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Create order success');
			deferred.resolve(documents);
		});

		return deferred.promise;
	};
	
	module.exports.closeOrder = function(id) {
		var deferred = q.defer();
		Order.mongo('update', { id: id },
			{$set: { status: 'closed' }
		}, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Close order success');
			deferred.resolve(documents);
		});

		return deferred.promise;
	};
	
	module.exports.cancelOrder = function(id) {
		var deferred = q.defer();
		Order.mongo('update', { id: id },
			{$set: { status: 'cancelled' }
		}, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Cancel order success');
			deferred.resolve(documents);
		});

		return deferred.promise;
	};
	
	module.exports.getOrderByID = function(id) {
		var deferred = q.defer();

		Order.findOne({ id: id }, function (err, result) {
			if (err) {
				debug('findOne err: ', err);
				deferred.reject(err);
			}
			else {
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	};
	
	module.exports.getLocationOrders = function(location) {
		var deferred = q.defer();
		
		Order.find({ location: location }).toArray(function(err, results) {
			if (err) {
				debug('find err: ', err);
				deferred.reject(err);
			}
			else {
				deferred.resolve(results);
			}
		});
		
		return deferred.promise;
	};
	
});*/