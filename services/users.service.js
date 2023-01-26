const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')

class UsersService {

  constructor() {

  }

  async findAndCount(query) {
    const options = {
      where: {},
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
  async createUser({ first_name, last_name, email, password, username }) {

    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword(password),
        username: username
      }, { transaction })

      let newProfile = await models.Profiles.create({
        id: uuid.v4(),
        user_id: '4a0b73b0-b1fa-400d-a6fb-14fecf36e091',
        role_id: 1,
        image_url:'g18.academlo.io/imgs/defaultProfile.png',
        codephone: 0,
        phone: 0,
        country_id: 1
      }, { transaction })

      await transaction.commit()
      return {newUser}

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async findUserById(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  // async findUserByEmail(email) {
  //   let user = await models.Users.findOne(email, { raw: true })
  //   return user
  // }

  async findUserByToken (token, cb) {
    process.nextTick( async() => {
      let user = await models.Users.findOne({
        where :{
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