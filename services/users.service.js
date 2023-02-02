const models = require('../database/models')
const { Op } = require('sequelize')
const CustomError = require('../utils/custom-error')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')


class UsersService {

  constructor() {

  }

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['password', 'email_verified', 'token', 'created_at', 'updated_at']
      }, include: {
        model: models.Profiles,
        attributes: ['image_url', 'code_phone', 'phone', 'country_id'],
        include: {
          model: models.Roles,
          attributes: ['name']
        }
      }
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }
  // { first_name, last_name, email, password, username, token }
  // { first_name, last_name, email, password, username, imageProfile, codephone, phone, country_id}
  async createUser(user) {

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

      // let user = await models.Users.create({
      //   first_name: first_name,
      //   last_name: last_name,
      //   email: email,
      //   password: hashPassword(password),
      //   username: username,
      //   profile:{
      //     id: uuid.v4(),
      //     user_id: '4a0b73b0-b1fa-400d-a6fb-14fecf36e091',
      //     role_id: 1,
      //     image_url:'g18.academlo.io/imgs/defaultProfile.png',
      //     codephone: 0,
      //     phone: 0,
      //     country_id: 1
      //   },
      // },
      // {
      //   include:[{
      //     association: this.User.bind(this.Profile)
      //   }]
      // },{transaction})

      await transaction.commit()
      return { newUser, newProfile }

    } catch (error) {
      await transaction.rollback()
      console.log(error)
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id, {
      attributes: {
        exclude: ['password', 'email_verified', 'token', 'created_at', 'updated_at']
      }, include: {
        model: models.Profiles,
        attributes: ['image_url', 'code_phone', 'phone', 'country_id', 'role_id']

      }
    })

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async findUserById(id) {
    let user = await models.Users.findByPk(id, {
      attributes: {
        exclude: ['password', 'email_verified', 'token', 'created_at', 'updated_at']
      },
      include: {
        model: models.Profiles,
        attributes: ['image_url', 'code_phone', 'phone', 'country_id', 'role_id']

      }
    }, { raw: true })
    return user
  }

  // async findUserByEmail(email) {
  //   let user = await models.Users.findOne(email, { raw: true })
  //   return user
  // }

  async findUserByToken(token, cb) {
    process.nextTick(async () => {
      let user = await models.Users.findOne({
        where: {
          token
        }
      })
      if (user?.token === token) {
        // console.log(user)
        return cb(null, user)
      }
    })
    return cb(null, null)

  }

  async updateUser(id, data) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update(data, { transaction })

      await transaction.commit()

      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      await user.destroy({ transaction })

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = UsersService