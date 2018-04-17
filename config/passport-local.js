const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const database = require('./database');


module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username and/or password.' });
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return done(err);
                    }
                    if (!res) {
                        return done(null, false, { message: 'Incorrect username and/or password' });
                    }
                    return done(null, user, 'You are now logged in.');
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
};
