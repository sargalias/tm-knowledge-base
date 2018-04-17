const router = require('express').Router();
const userController = require('../controllers/users');
const passport = require('passport');


router.get('/', userController.userList);

router.get('/register', userController.newUser);

router.post('/register', userController.userRegistrationValidation, userController.createUser);

router.get('/login', userController.loginForm);

router.post('/', userController.userLoginSanitization, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: true
}), userController.loginPost);



module.exports = router;
