'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Publications_types.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    descriptions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications_types',
  });
  return Publications_types;
};