'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publication_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      publication_tags.hasMany(models.Tags)
    }
  }
  publication_tags.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    tag_id: DataTypes.BIGINT,
    publication_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'publication_tags',
  });
  return publication_tags;
};