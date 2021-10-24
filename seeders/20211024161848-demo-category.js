'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', [
      {
        id: 1,
        title:"Hammed Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title:"Aarifana Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title:"Naatya Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title:"Short Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title:"Asfaar Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title:"Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        title:"zikar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        title:"English Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        title:"Urdu Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        title:"Al-Abraar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
