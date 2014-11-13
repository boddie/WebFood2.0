var q = require('q');
var debug = require('debug')('webfood:userdao');

module.exports = function(db) {
	var User = require('mongolia').model(db, 'members');
	/**
	 * Attempt to create a user in the database
	 * @param  {string} username
	 * @param  {string} hashedPassword Password hashed with bcrypt
	 * @return {Array}  An array containing the created object
	 */
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
	/**
	 * Finds a user based on any of it's properties
	 * @param  {object} criteria Object of properties to match against. E.g. {username:"foobar"} will search for a user named foobar
	 * @return {Promise} Promise that resolves with the found object, or null if none were found. Rejects with a database error, if any
	 */
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
