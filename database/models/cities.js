'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.hasMany(models.Publications)
      Cities.belongsTo(models.Countries)
    }
  }
  Cities.init({
    id: DataTypes.UUID,
    country_id: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    timestamps: true,
    underscored: true,
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    }
  });
  return Cities;
};