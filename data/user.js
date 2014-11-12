var q = require('q');
var debug = require('debug')('webfood:userdao');

module.exports = {};

var db = require('./connection')(function (err, db) {
	var User = require('mongolia').model(db, 'members');

	module.exports.create = function (username, hashedPassword) {
		var deferred = q.defer();
		debug('Registering: ', username, hashedPassword);
		User.mongo('insert', {
			username: username,
			password: hashedPassword
		}, function(err, documents) {
			if (err) debug('err: ', err);
			else debug('Registration success');
			deferred.resolve(documents);
		});

		return deferred.promise;
	};

	module.exports.findByEmail = function (email) {
		return module.exports.findOne({username: email});
	};

	module.exports.findOne = function (criteria) {
		var deferred = q.defer();

		User.findOne(criteria, function (err, result) {
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
});
