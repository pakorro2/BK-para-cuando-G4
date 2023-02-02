const models = require('../database/models')
const { Op } = require('sequelize')
const uuid = require('uuid').v4
const CustomError = require('../utils/custom-error')

class PublicationsService {

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

    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  async findAllPublicationByUser(user_id) {
    const profile = await models.Profiles.findOne({
      where: {
        user_id: user_id
      }
    })
    if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

    const publications = await models.Publications.findAll({
      where: {
        profile_id: profile.id
      }
    })
    // if (!publications) throw new CustomError('Not found any publication', 404, 'Not Found')
    console.log(publications)
    return publications
  }

  async findPublicationById(id) {
    const publication = await models.Publications.findByPk(id)
    if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

    return publication
  }

  async createPublication(profile_id, publication) {

    const transaction = await models.sequelize.transaction()
    try {
      const newPublication = await models.Publications.create({
        id: uuid(),
        profile_id: profile_id,
        publication_type_id: publication.publication_type_id,
        city_id: publication.city_id,
        title: publication.title,
        description: publication.description,
        content: publication.content,
        picture: publication.picture,
        image_url: publication.image_url
      }, { transaction })

      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updatePublication(id, data) {
    const transaction = await models.sequelize.transaction()
    try {
      const publication = await models.Publications.findByPk(id)
      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

      const updatedPublication = await publication.update(data, { transaction })

      await transaction.commit()
      return updatedPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async destroyPublication(id) {
    const transaction = await models.sequelize.transaction()
    try {
      const publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

      await publication.destroy({ transaction })

      await transaction.commit()
      return publication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = PublicationsService