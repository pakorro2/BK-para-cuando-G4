'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tags.belongsTo(models.publication_tags)
      Tags.hasMany(models.Publications)
    }
  }
  Tags.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    publication_tags_id: {
      type: DataTypes.BIGINT,
      foreignKey:true,
      references:{
        key:'id',
        model: 'publication_tags',
      },
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};