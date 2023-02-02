'use strict'
const uuid = require('uuid')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.hasMany(models.Publications)
      Profiles.belongsTo(models.Users)
      Profiles.belongsTo(models.Roles)
      Profiles.belongsTo(models.Countries)
      Profiles.belongsToMany(models.Publications, { through: models.Votes, foreignKey: 'profile_id' })
    }
  }
  Profiles.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: DataTypes.BIGINT,
    role_id: DataTypes.INTEGER,
    image_url: {
      type: DataTypes.STRING,
      // validate: {
      //   isUrl: true
      // }
    },
    country_id: DataTypes.INTEGER,
    code_phone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',
    timestamps: true,
    underscored: true,
    scopes: {
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      }
    }
  })
  return Profiles
}