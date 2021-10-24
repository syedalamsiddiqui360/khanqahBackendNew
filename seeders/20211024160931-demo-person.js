'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('person', [
      {
        id: 1,
        title:"Arif Billah Hazrat Aqdas Molana Shah Hakeem Muhammad Akhter SB RA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title:"Hazrat Aqdas Molana Shah Hakeem Muhammad Mazhar SB DB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title:"Hazrat Sufi Shamim SB DB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title:"Hazrat Molana Abid Shah SB DB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title:"Molana Anwar SB DB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title:"Molana Rashid SB DB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('person', null, {});
  }
};
