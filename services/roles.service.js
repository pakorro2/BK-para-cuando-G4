const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')



class RolesService {

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

    const roles = await models.Roles.findAndCountAll(options)
    return roles
  }
  
  async createRoles({ name }) {

    const transaction = await models.sequelize.transaction()
    try {
      let newRole = await models.Role.create({
        id: uuid.v4(),
        name: name,
      }, { transaction })

      await transaction.commit()
      return newRole
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getRoleOr404(id) {
    let role = await models.Roles.findByPk(id)

    if (!role) throw new CustomError('Not found User', 404, 'Not Found')

    return role
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async findRoleById(id) {
    let role = await models.Roles.findByPk(id, { raw: true })
    return role
  }

  async updateCity(id, name) {
    console.log(name)
    const transaction = await models.sequelize.transaction()
    try {
      let role = await models.Roles.findByPk(id)

      if (!role) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedRole = await role.update({
        name
      }, { transaction })

      await transaction.commit()

      return updatedRole
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeRole(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let role = await models.Roles.findByPk(id)

      if (!role) throw new CustomError('Not found user', 404, 'Not Found')

      await role.destroy({ transaction })

      await transaction.commit()

      return role
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = RolesService