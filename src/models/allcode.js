'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'PositionData' })
      Allcode.hasMany(models.Product, { foreignKey: 'priceId', as: 'priceData' })
      Allcode.hasMany(models.Product, { foreignKey: 'size', as: 'sizeData' })
   
   
    }
  };
  Allcode.init({
    type: DataTypes.STRING,
    keyMap: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};