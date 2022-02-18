const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const { UserController } = require('../controllers/user');
const { AuthController } = require('../controllers/auth');
const {
  signUpSchema,
  signInSchema,
  updateUserSchema,
  updateUserPassSchema,
} = require('../validation/index');
const authMiddleware = require('../middleware/authMiddleware');
const fileMiddleware = require('../middleware/file');

const router = express.Router();

router.get('/user', authMiddleware, (req, res) => UserController.getOneUser(req, res));
router.put('/user', authMiddleware, validator.body(updateUserSchema), (req, res) => UserController.updateUser(req, res));
router.post('/upload',authMiddleware, fileMiddleware.single('avatar'), (req, res) => UserController.uploadAvatar(req, res))
router.put('/updatePass', authMiddleware, validator.body(updateUserPassSchema), (req, res) => UserController.updateUser(req, res));


router.post('/signUp', validator.body(signUpSchema), (req, res) => AuthController.signUp(req, res));
router.post('/signIn', validator.body(signInSchema), (req, res) => AuthController.signIn(req, res));

module.exports = router;