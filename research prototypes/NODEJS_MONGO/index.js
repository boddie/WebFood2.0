'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
	'mongodb://jbertram:password1@ds051110.mongolab.com:51110/se329p3',
	function(err, connection) {
		// Uses customer collection within se329p3 database
		var Order = connection.collection('orders');
		
		Order.update({ id: 12 }, { $set: { status: 'closed' } }, function(err, count) {
		
			console.log('Updated', count, 'documents');
			
			Order.find().toArray(function(err, documents) {
				console.dir(documents);
				connection.close();
			});
			
		});
	}
);