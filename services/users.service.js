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
  async createUser({ first_name, last_name, email, password, username, token }) {

    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword(password),
        username: username,
        token: token,
        // name,
      }, { transaction })

      await transaction.commit()
      return newUser
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

  async findUserByEmail(email) {
    let user = await models.Users.findOne(email, { raw: true })
    return user
  }

  async updateUser(id, name) {
    console.log(name)
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update({
        name
      }, { transaction })

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