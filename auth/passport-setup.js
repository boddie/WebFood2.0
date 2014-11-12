var User = require('../data/user');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var debug = require('debug')('webfood:passport');
var q = require('q');

var verifyPassword = function(password, hash) {
    var deferred = q.defer();


    bcrypt.compare(password, hash, function(err, result) {
        if (err) deferred.resolve(false);
        deferred.resolve(result);
    });

    return deferred.promise;
};


module.exports = function(passport) {

    passport.serializeUser = function(user, req, done) {
        done(null, user.id);
    };

    passport.deserializeUser = function(id, req, done) {
        if (id.id) id = id.id;

        User.findOne({id: id}).then(function(user) {
            if (user)
                done(null, user);
            else
                done("not found");
        })
    };

    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            debug('Login Strategy invoked for ' +username);
            return User.findOne({username: username}).then(function(user) {
                if (user == null) {
                    return done(null, false, {message: 'unknown user'});
                }
                debug('Found user in database');
                return verifyPassword(password, user.password).then(function(result){
                    if (result) {
                        return done(null, user);
                    }
                    return done(null, false, {message: 'invalid password'});
                });
            }, function(err) {
                return done(err);
            });
        }
    ));

    passport.registerUser = function(req, res, next) {
        debug('Attempt to register ', req.body.username);
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({email:username}).then(function(user) {
            if (user) {
                res.status(400);
                res.send({success: false, message: "Username is taken"});
            } else {
                User.create(username, bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
                .then(function(newUser) {
                    debug('Registration success: ', newUser.email);
                    req.logIn(newUser, function(err) {
                        if (err) { return next(err); }
                        return res.send(newUser);
                    });
                }, function(err) {
                    debug('Registration error: ', err);
                    return next(err);
                });
            }

        }, function(err) {
            debug('Registration error in dao: ', err);
        });
    };

};