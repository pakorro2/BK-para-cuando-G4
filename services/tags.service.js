const models = require('../database/models')
const { Op, BIGINT } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')

class TagsService {

  constructor() {
    // this.Tags = models.Tags
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
  // { first_name, last_name, email, password, username, imageProfile, codephone, phone, country_id}
  async createTag(Tag) {

    const transaction = await models.sequelize.transaction()
    try {
      let newTags = await models.Tags.create({
        id: Tag.id,
        publication_tags_id: Tag.publication_tags_id,
        name: Tag.name,
      }, { transaction })

      let newPublication_Tags = await models.publication_tags.create({
        id: { DataTypes: BIGINT },
        tag_id: { DataTypes: BIGINT },
        publication_id: uuid.v4(),
      }, { transaction })

      await transaction.commit()
      return { newTags, newPublication_Tags }

    } catch (error) {
      await transaction.rollback()
      console.log(error)
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getTagsOr404(id) {
    let tag = await models.Tags.getTagsById(id)

    if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')

    return tag
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getTagsById(id) {
    let tag = await models.Tags.getTagsById(id, { raw: true })
    return tag
  }

  async updateTags(id, data) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tags.getTagsById(id)

      if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

      let updatedTag = await tag.update(data, { transaction })

      await transaction.commit()

      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  async removeTags(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tags.getTagsById(id)

      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')

      await tag.destroy({ transaction })

      await transaction.commit()

      return tag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = TagsService