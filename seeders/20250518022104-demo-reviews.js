'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        comment: 'Super service !',
        mark: 5,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment: 'Très bon kiosque, accueil sympa.',
        mark: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment: 'Correct mais peut mieux faire.',
        mark: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment: 'Pas satisfait de la qualité.',
        mark: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
