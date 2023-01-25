'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Profiles)
    }
  }
  Users.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: uuid.v4()
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    // email_verified: DataTypes.DATE,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    scopes: {
      public_view: {
        attributes: ['id'],
        exclude: ['password']
      }
    },
    // no_timestamps: {
    //   attributes: { exclude: ['created_at', 'updated_at'] }
    // }
  });
  return Users;
};