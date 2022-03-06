const Sequelize = require('sequelize');

const { sequelize } = require('../config/db');

const Rating = sequelize.define('ratings', {
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
  bookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, { tableName: 'ratings' });

module.exports = {
  Rating,
};
