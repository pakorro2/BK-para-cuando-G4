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

    const { tags } = query
    if (tags) {
      let tagsIDs = tags.split(',')
      options.include.push({ // El options que les di en el ejemplo 
        model: models.Tags,
        as: 'tags',
        required: true,
        where: { id: tagsIDs },
        through: { attributes: [] }
      })
    }

    return publications
  }

  async findPublicationById(id) {
    const publication = await models.Publications.findByPk(id)
    if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

    return publication
  }

  async createPublication(user_id, publication) {
    const profile = await models.Profiles.findOne({
      where: {
        user_id: user_id
      }
    })

    const transaction = await models.sequelize.transaction()
    try {
      const newPublication = await models.Publications.create({
        id: uuid(),
        profile_id: profile.id,
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