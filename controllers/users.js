const User = require('../models/user');


module.exports.userList = function(req, res) {
    res.redirect('/users/login');
};

module.exports.newUser = function(req, res) {
    res.render('users/register');
};

module.exports.createUser = function(req, res) {
    res.send('you reached the create user route');
};

module.exports.loginForm = function(req, res) {
    res.render('users/login');
};

module.exports.loginPost = function(req, res) {
    res.send('you reached the login post route');
};
