'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.hasMany(models.Cities)
      Countries.hasMany(models.Profiles)
    }
  }
  Countries.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'countries',
    timestamps: true,
    underscored: true,
    scopes: {
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      }
    }
  })
  return Countries
}