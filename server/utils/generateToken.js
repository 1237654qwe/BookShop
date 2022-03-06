const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '256h' });
};

module.exports = {
  generateToken,
};
