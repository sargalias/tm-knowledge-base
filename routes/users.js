const router = require('express').Router();
const userController = require('../controllers/users');


router.get('/', userController.userList);

router.get('/register', userController.newUser);

router.post('/register', userController.userRegistrationValidation, userController.createUser);

router.get('/login', userController.loginForm);

router.post('/', userController.loginPost);



module.exports = router;
