'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.hasMany(models.Votes)
      Publications.belongsTo(models.Profiles)
      Publications.belongsTo(models.Cities)
      Publications.belongsTo(models.Publications_type)
    }
  }
  Publications.init({
    id: DataTypes.UUID,
    profile_id: DataTypes.UUID,
    publications_types_id: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    city_id: DataTypes.STRING,
    imagen_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    timestamps: true,
    underscored: true,
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    }
  });
  return Publications;
};