'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Allcode, { foreignKey: 'status', targetKey: 'keyMap', as: 'orderStatusData' })
      Order.belongsTo(models.User, { foreignKey: 'customerId', targetKey: 'id', as: 'customerData' })
      Order.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'productData' })
    }
  };
  Order.init({
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};