const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')


class CitiesService {

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

    const cities = await models.Cities.findAndCountAll(options)
    return cities
  }
  // { first_name, last_name, email, password, username, token }
  async createCities({ name }) {

    const transaction = await models.sequelize.transaction()
    try {
      let newCity = await models.City.create({
        id: uuid.v4(),
        name: name,
        country_id: body.countryId        //?como importar el id dela tabla country??
      }, { transaction })

      await transaction.commit()
      return newCity
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCityOr404(id) {
    let city = await models.Cities.findByPk(id)

    if (!city) throw new CustomError('Not found User', 404, 'Not Found')

    return city
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async findCityById(id) {
    let city = await models.Cities.findByPk(id, { raw: true })
    return City
  }

  async updateCity(id, name) {
    console.log(name)
    const transaction = await models.sequelize.transaction()
    try {
      let city = await models.Cities.findByPk(id)

      if (!city) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedCity = await city.update({
        name
      }, { transaction })

      await transaction.commit()

      return updatedCity
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCity(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let City = await models.Cities.findByPk(id)

      if (!City) throw new CustomError('Not found user', 404, 'Not Found')

      await city.destroy({ transaction })

      await transaction.commit()

      return city
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = CitiesService