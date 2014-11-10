var debug = require('debug')('webfood:connection');
var mongodb = require('mongodb').MongoClient;

var db;

debug('Connecting to database...');

module.exports = function (cb) {
	if (!db) {
		mongodb.connect('mongodb://jbertram:password1@ds051110.mongolab.com:51110/se329p3', function(err, result) {
			if (err) {
				debug('error: ', err);
				cb(err);
			}
			else {
				debug('Connection established');
				db = result;
				cb(null, db);
			}
		});
	}
	else {
		process.nextTick(function () {
			cb(null, db);
		});
	}
};
