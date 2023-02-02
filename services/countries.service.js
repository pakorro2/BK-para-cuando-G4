const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')



class CountriesService {

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

    const countries = await models.Countries.findAndCountAll(options)
    return countries
  }
  
  async createCcountries({ name }) {

    const transaction = await models.sequelize.transaction()
    try {
      let newCountry = await models.Country.create({
        id: uuid.v4(),
        name: name,
      }, { transaction })

      await transaction.commit()
      return newCountry
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCountryOr404(id) {
    let country = await models.Countries.findByPk(id)

    if (!country) throw new CustomError('Not found User', 404, 'Not Found')

    return country
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async findCountryById(id) {
    let country = await models.Countries.findByPk(id, { raw: true })
    return country
  }

  async updateCountry(id, name) {
    console.log(name)
    const transaction = await models.sequelize.transaction()
    try {
      let country = await models.Countries.findByPk(id)

      if (!country) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedCountry = await country.update({
        name
      }, { transaction })

      await transaction.commit()

      return updatedCountry
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCountry(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let country = await models.Countries.findByPk(id)

      if (!country) throw new CustomError('Not found user', 404, 'Not Found')

      await country.destroy({ transaction })

      await transaction.commit()

      return country
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = CountriesService