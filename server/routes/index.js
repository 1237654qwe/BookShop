const express = require('express');

const { authRoute } = require('./authRoute');
const { bookRoute } = require('./bookRoute');
const { userRoute } = require('./userRoute');

const router = express.Router();

authRoute(router);
bookRoute(router);
userRoute(router);

module.exports = router;
