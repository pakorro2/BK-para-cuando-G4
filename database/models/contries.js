'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contries.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contries',
  });
  return Contries;
};