'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('news', [
      {
        id: 1,
        title:"default",
        description: "LIVE Bayanaat sunn'ny kay lye majlis k auqat me website visit kren. JazakALLAH",
        expire: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('news', null, {});
  }
};
