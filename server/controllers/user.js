// const bcrypt = require('bcrypt');
// const uuid = require('uuid')
// const multer  = require("multer");

const { User } = require('../models/user');


class UserController {
  static async getOneUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      
      res.json({id: user.id, name: user.name, email: user.email, dob: user.dob, avatarUrl: user.avatarUrl});
    } catch (e) {
      res.status(500).json(e);
    }
  };

  static async updateUser(req, res) {
    try {
      const { name, email, dob, file } = req.body

      const user = await User.update({
        name: name,
        email: email,
        dob: dob,
      },
        {
          where: {
            id: req.user.id
          }
        }
      );

      res.json({id: user.id, name: user.name, email: user.email, dob: user.dob, avatarUrl: user.avatarUrl});
    } catch (e) {
      res.status(500).json(e);
    }
  };

  static async updatePass(req, res) {
    try {
      const { pass } = req.body
      const {salt} = await User.findByPk(req.user.id)

      const user = await User.update({
        pass: bcrypt.hashSync(pass, salt),
      },
        {
          where: {
            id: req.user.id
          }
        }
      );

      res.json({pass: user.pass});
    } catch (e) {
      res.status(500).json(e);
    }
  };

  static async uploadAvatar(req, res) {
    try {
      const file = req.file
      
      const user = await User.update({
        avatarUrl: file.filename
      },
        {
          where: {
            id: req.user.id
          }
        }
      );

      res.json(user.avatarUrl)
  
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

module.exports = {
  UserController,
};