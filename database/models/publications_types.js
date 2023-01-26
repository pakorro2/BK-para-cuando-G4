'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_types.hasMany(models.Publications)
    }
  }
  Publications_types.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'publications_types',
    timestamps: true,
    underscored: true,
    scopes: {
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      }
    }
  })
  return Publications_types
}