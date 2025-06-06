'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kiosk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Kiosk.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Kiosk.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    geolocation: DataTypes.GEOGRAPHY('POINT', 4326),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kiosk',
  });
  return Kiosk;
};