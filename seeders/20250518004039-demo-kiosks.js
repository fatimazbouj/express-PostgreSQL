'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = 1;

    await queryInterface.bulkInsert('Kiosks', [
      {
        title: 'Kiosque Hassan',
        description: 'Centre de vente de journaux',
        geolocation: Sequelize.fn(
            'ST_GeogFromText',
            'SRID=4326;POINT(-6.833 34.017)'
        ),
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kiosque Agdal',
        description: 'Petite librairie',
        geolocation: Sequelize.fn(
            'ST_GeogFromText',
            'SRID=4326;POINT(-6.848 34.000)'
        ),
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kiosque Océan',
        description: 'Kiosque à journaux près de la mer',
        geolocation: Sequelize.fn(
            'ST_GeogFromText',
            'SRID=4326;POINT(-6.830 34.030)'
        ),
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kiosks', null, {});
  }
};
