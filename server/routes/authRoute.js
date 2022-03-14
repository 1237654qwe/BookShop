const validator = require('express-joi-validation').createValidator({});

const { AuthController } = require('../controllers/AuthController');
const {
  signUpSchema,
  signInSchema,
} = require('../validation/index');

const authRoute = (router) => {
  router.post('/sign-up', validator.body(signUpSchema), AuthController.signUp);
  router.post('/sign-in', validator.body(signInSchema), AuthController.signIn);
};

module.exports = {
  authRoute,
};
