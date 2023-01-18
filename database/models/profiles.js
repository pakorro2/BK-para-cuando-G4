'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.Users)
      Profiles.belongsTo(models.Roles)
      Profiles.belongsTo(models.Countries)
      Profiles.belongsTo(models.Votes)
      Profiles.hasMany(models.Publications)
    }
  }
  Profiles.init({
    id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    role_id: DataTypes.INTEGER,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    codephone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',
    timestamps: true,
    underscored: true,
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    }
  });
  return Profiles;
};