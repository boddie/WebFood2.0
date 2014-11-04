var q = require('q');
var bookshelf = require('./connection');
var debug = require('debug')('webfood.userdao');

var User = bookshelf.Model.extend({
	tableName: 'users'
}, {

	findOne: function(criteria) {
		var deferred = q.defer();

		new this(criteria).fetch().tap(function(user) {
			if (!user) deferred.resolve(null);
			else deferred.resolve(user.attributes);
		}, function(err) {
			deferred.resolve(null);
		});

		return deferred.promise;
	},

	findByEmail: function(email) {
		var deferred = q.defer();

		new this({ email: email.trim() }).fetch({ require: true }).tap(function(user) {
			deferred.resolve(user.attributes);
		}, function(err) {
			console.log('err: ', err);
		});

		return deferred.promise;
	},

	create: function(email, hashedPassword) {
		debug('Create: ', email, hashedPassword);
		var self = this;

		return new self({ email: email, password: hashedPassword }).save().then(function(user) {
			debug('Created: ', user.attributes);
			return user.attributes;
		}, function(err) {
			debug('Error in create:', err);
			return null;
		});
	}
});

module.exports = User;
