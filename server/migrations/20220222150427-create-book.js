/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('books', {
        id: {
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        author: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        genre: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },
        rating: {
          type: Sequelize.INTEGER,
        },
        coverUrl: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable('books');
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },
};
