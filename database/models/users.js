'use strict'
const uuid = require('uuid')
const { Model } = require('sequelize')
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
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email_verified: DataTypes.DATEONLY,
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
  })
  return Users
}
