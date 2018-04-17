const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

module.exports.userList = function(req, res) {
    res.redirect('/users/login');
};

module.exports.newUser = function(req, res, next) {
    res.render('users/register');
};

module.exports.createUser = function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) return next(err);
        User.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hash
        }, (err) => {
            if (err) return next(err);
            req.flash('success', 'You are now registered and can login.');
            res.redirect('/users/login');
        });
    });
};

module.exports.loginForm = function(req, res) {
    res.render('users/login', {title: 'Login'});
};

module.exports.loginPost = function(req, res) {
    res.send('you reached the login post route');
};

module.exports.userRegistrationValidation = [
    // Validate
    body('name', 'Name is required.').trim().isLength({min: 1}),
    body('email').trim()
        .isLength({min: 1}).withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
    body('username').trim()
        .isLength({min: 1}).withMessage('Username is required.')
        .isAlpha().withMessage('Username must only contain letters and numbers.'),
    body('password').trim()
        .isLength({min: 1}).withMessage('Password is required.'),
    body('password2').trim()
        .isLength({min: 1}).withMessage('Confirm password is required.')
        .custom((val, {req}) => val === req.body.password).withMessage("Passwords don't match."),
    // Sanitize
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape().normalizeEmail(),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),

    // Error checking
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const user = matchedData(req);
            return res.render('users/register', {title: 'Register', errors: errors.array(), user: user});
        }
        next();
    }
];

module.exports.userLoginSanitization = [
    // Sanitize
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
];