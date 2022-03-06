const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');
const { Comment } = require('./comment');
const { Rating } = require('./rating');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { tableName: 'users' });
User.hasMany(Comment);
User.hasMany(Rating);

module.exports = {
  User,
};
