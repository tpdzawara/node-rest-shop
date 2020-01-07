const router = require('express').Router();
const UserController = require('../controller/user');
const checkAuth = require('../middleware/check-auth');

//Signup 
router.post('/signup',  UserController.users_signup_user);

//Login
router.post('/login',  UserController.users_login_user);

//Delete User
router.delete('/:userId', checkAuth, UserController.users_delete_user);

module.exports = router; 