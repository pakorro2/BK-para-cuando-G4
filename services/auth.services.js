
const { comparePassword, hashPassword } = require('../utils/crypto')
const { CustomError } = require('../utils/custom-error')
const models = require('../database/models')
const uuid = require('uuid')


const chekUserCredential = async (email, password) => {
  const user = await models.Users.findOne({
    where: {
      email
    },
    include: {
      model: models.Profiles,
      include: {
        model: models.Roles
      }
    }
  })
  try {
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword) {
      return user
    }
    return null
  } catch (error) {
    return null
  }
}

const createUserAndProfile = async (user) => {
  const transaction = await models.sequelize.transaction()
  try {
    let newUser = await models.Users.create({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: hashPassword(user.password),
      username: user.username
    }, { transaction })

    let newProfile = await models.Profiles.create({
      id: uuid.v4(),
      user_id: +newUser.id,
      role_id: 1,
      image_url: user.image_url || 'local.hsot.e/profile/',
      code_phone: +user.code_phone || 0,
      phone: +user.phone || 6567,
      country_id: +user.country_id || 1
    }, { transaction })

    // let newUser = await models.Users.create({
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   email: user.email,
    //   password: hashPassword(user.password),
    //   username: user.username,
    //   profile: {
    //     id: uuid.v4(),
    //     user_id: +newUser.id,
    //     role_id: 1,
    //     image_url: user.image_url || 'local.hsot.e/profile/',
    //     code_phone: +user.code_phone || 0,
    //     phone: +user.phone || 6567,
    //     country_id: +user.country_id || 1
    //   },
    // }, {
    //   include: [{
    //     association: models.Profiles.Users
    //   }]
    // }, { transaction })

    if (!newUser) throw new CustomError('Not found User', 404, 'Not Found')
    await transaction.commit()
    return { newUser, newProfile }

  } catch (error) {
    await transaction.rollback()
    console.log(error)
    throw error
  }
}

const checkInfoToken = async (id) => {
  try {
    const user = await models.Users.findOne({
      where: {
        id: id
      },
      attributes: {
        exclude: ['password', 'email_verified', 'token', 'created_at', 'updated_at']
      }, include: {
        model: models.Profiles,
        attributes: ['id', 'image_url', 'code_phone', 'phone', 'country_id', 'role_id']

      }
    })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  } catch (error) {
    return null
  }
}
module.exports = {
  chekUserCredential,
  createUserAndProfile,
  checkInfoToken
}
