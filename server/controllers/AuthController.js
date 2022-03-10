const bcrypt = require('bcrypt');

const { User } = require('../models/user');
const { generateToken } = require('../utils/generateToken');

class AuthController {
  static async signUp(req, res) {
    try {
      const candidate = await User.findOne({ where: { email: req.body.email } });

      if (candidate) {
        res.status(409).json({
          message: 'Этот email уже существует',
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const { password } = req.body;

        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(password, salt),
          salt,
          dob: req.body.dob,
        });

        await user.save();
        const token = generateToken(user.id);
        res.status(201).json({ token });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async signIn(req, res) {
    try {
      const candidate = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (candidate) {
        const hashPass = bcrypt.hashSync(req.body.password, candidate.salt);
        const passResult = hashPass === candidate.password;
        if (passResult) {
          const token = generateToken(candidate.id);
          res.json({ token });
        } else {
          res.status(401).json({
            message: 'Неверный пароль',
          });
        }
      } else {
        res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = {
  AuthController,
};
