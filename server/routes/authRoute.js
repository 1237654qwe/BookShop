const validator = require('express-joi-validation').createValidator({});

const { AuthController } = require('../controllers/AuthController');
const {
  signUpSchema,
  signInSchema,
} = require('../validation/index');

const authRoute = (router) => {
  router.post('/sign-up', validator.body(signUpSchema), (req, res) => AuthController.signUp(req, res));
  router.post('/sign-in', validator.body(signInSchema), (req, res) => AuthController.signIn(req, res));
};

module.exports = {
  authRoute,
};
