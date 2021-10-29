'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', [
      {
        id: 1,
        type_id:1,
        title:"Hammed Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        type_id:1,
        title:"Aarifana Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        type_id:1,
        title:"Naatya Kalaam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        type_id:2,
        title:"Short Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        type_id:2,
        title:"Asfaar Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        type_id:2,
        title:"khanqah Bayan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        type_id:3,
        title:"zikar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        type_id:4,
        title:"English Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        type_id:4,
        title:"Urdu Book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        type_id:5,
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
