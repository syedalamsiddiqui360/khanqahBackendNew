'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', [
      {
        id: 1,
        typeId:1,
        title:"Hammed Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        typeId:1,
        title:"Aarifana Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        typeId:1,
        title:"Naatya Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        typeId:2,
        title:"Short Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        typeId:2,
        title:"Asfaar Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        typeId:2,
        title:"khanqah Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        typeId:3,
        title:"zikar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        typeId:4,
        title:"English Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        typeId:4,
        title:"Urdu Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        typeId:5,
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
