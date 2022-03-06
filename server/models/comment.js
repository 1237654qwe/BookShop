const Sequelize = require('sequelize');

const { sequelize } = require('../config/db');

const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  bookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'comments' });

module.exports = {
  Comment,
};
