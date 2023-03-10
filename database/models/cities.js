'use strict'
const { Model } = require('sequelize')
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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    country_id: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    timestamps: true,
    underscored: true,
    scopes: {
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      }
    }
  })
  return Cities
}