'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Publications.belongsToMany(models.Profiles, { through: models.Votes, foreignKey: 'publication_id' })
      Publications.belongsTo(models.Profiles)
      Publications.belongsTo(models.Cities)
      Publications.belongsToMany(models.Tags, { as: 'tags', through: models.publication_tags, foreignKey: 'publication_id' })
      Publications.belongsTo(models.PublicationsTypes, { foreignKey: 'publication_type_id'})
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    profile_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING,
    city_id: DataTypes.STRING,
    tag_id: {
      type: DataTypes.BIGINT,
      foreignKey: true,
      references: {
        key: 'id',
        tableName: 'Tags'
      }
    },
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
    scopes: {
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      }
    }
  })
  return Publications
}