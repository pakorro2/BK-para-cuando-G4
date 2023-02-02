'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Profiles, { foreignKey: 'profile_id' })
      Votes.belongsTo(models.Publications, { foreignKey: 'publication_id' })
    }
  }
  Votes.init({
    profile_id: DataTypes.UUID,
    publication_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    timestamps: true,
    underscored: true,
  })
  return Votes
}