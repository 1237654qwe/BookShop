const Sequelize = require('sequelize');

const { sequelize } = require('../config/db');

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'comment' });

module.exports = {
  Comment,
};
