'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('slider', [
      {
        id: 1,
        title:"homePage1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title:"homePage2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('slider', null, {});
  }
};
