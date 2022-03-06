/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('comments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        parentId: {
          type: Sequelize.INTEGER,
        },
        bookId: {
          type: Sequelize.INTEGER,
        },
        text: {
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
      await queryInterface.dropTable('comments');
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },
};
