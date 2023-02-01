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
      Profiles.hasMany(models.Publications)
      Profiles.hasMany(models.Votes)
      Profiles.belongsTo(models.Roles)
      Profiles.belongsTo(models.Countries)
    }
  }
  Profiles.init({
    profile_id: { type:DataTypes.UUID,
          primaryKey:true
    },
    user_id: DataTypes.UUID,
    role_id: DataTypes.UUID,
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