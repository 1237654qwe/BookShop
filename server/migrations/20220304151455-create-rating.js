/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('ratings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('ratings');
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },
};
