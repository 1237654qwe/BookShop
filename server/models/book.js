const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');
const { Comment } = require('./comment');
const { Rating } = require('./rating');

const Book = sequelize.define('books', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { tableName: 'books' });
Book.hasMany(Comment);
Book.hasMany(Rating);

module.exports = {
  Book,
};
