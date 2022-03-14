const validator = require('express-joi-validation').createValidator({});

const { UserController } = require('../controllers/UserController');
const {
  updateUserSchema,
  updateUserPassSchema,
} = require('../validation/index');
const authMiddleware = require('../middleware/authMiddleware');
const fileMiddleware = require('../middleware/file');

const userRoute = (router) => {
  router.get('/user/:id', authMiddleware, UserController.getOneUser);
  router.put('/user/:id', authMiddleware, validator.body(updateUserSchema), UserController.updateUser);
  router.post('/upload/:id', authMiddleware, fileMiddleware.single('avatar'), UserController.uploadAvatar);
  router.put('/update-password/:id', authMiddleware, validator.body(updateUserPassSchema), UserController.updatePass);
};

module.exports = {
  userRoute,
};
