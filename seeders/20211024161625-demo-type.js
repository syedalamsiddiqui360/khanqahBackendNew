'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [
      {
        id: 1,
        title:"Ashar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title:"Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title:"Zikar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title:"Books",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title:"Magzeen",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};
