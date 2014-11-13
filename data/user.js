var q = require('q');
var debug = require('debug')('webfood:userdao');

module.exports = function(db) {
	var User = require('mongolia').model(db, 'members');
	var create = function (username, hashedPassword) {
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
	var findByEmail = function (email) {
		return findOne({username: email});
	};
	var findOne = function (criteria) {
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
	return {
		create : create,
		findByEmail : findByEmail, 
		findOne : findOne

	};
};
