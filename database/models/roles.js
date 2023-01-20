'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasMany(models.Profiles)
    }
  }
  Roles.init({
    id: DataTypes.UUID,
    name: {
      type: DataTypes.STRING,
      defaultValue: 'public'
    }
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: true,
    underscored: true,
  });
  return Roles;
};