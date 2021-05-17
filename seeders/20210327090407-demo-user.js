'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'syed',
      lastName: 'faizan',
      email: 'dsyedfaizan2021@gmail.com',
      password: '',
      phone: '03242617725',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
