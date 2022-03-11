const validator = require('express-joi-validation').createValidator({});

const { UserController } = require('../controllers/UserController');
const {
  updateUserSchema,
  updateUserPassSchema,
} = require('../validation/index');
const authMiddleware = require('../middleware/authMiddleware');
const fileMiddleware = require('../middleware/file');

const userRoute = (router) => {
  router.get('/user', authMiddleware, (req, res) => UserController.getOneUser(req, res));
  router.put('/user', authMiddleware, validator.body(updateUserSchema), (req, res) => UserController.updateUser(req, res));
  router.post('/upload', authMiddleware, fileMiddleware.single('avatar'), (req, res) => UserController.uploadAvatar(req, res));
  router.put('/update-password', authMiddleware, validator.body(updateUserPassSchema), (req, res) => UserController.updatePass(req, res));
};

module.exports = {
  userRoute,
};
