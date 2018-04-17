const router = require('express').Router();
const userController = require('../controllers/users');
const passport = require('passport');


router.get('/', userController.userList);

router.get('/register', userController.newUser);

router.post('/register', userController.userRegistrationValidation, userController.createUser);

router.get('/login', userController.loginForm);

router.post('/', userController.userLoginSanitization, passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: true
}), userController.loginPost);

router.get('/logout', userController.logout);



module.exports = router;
