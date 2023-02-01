const TagsService = require('../services/tags.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const tagsService = new TagsService()

const getTags = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let tags = await tagsService.findAndCount(query)
    const results = getPagingData(tags, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addTags = async (request, response, next) => {

  try {
    let { publication_tags_id, name} = request.body
    if (publication_tags_id && name) {
      console.log(request.body)
      let tags = await tagsService.createTag(request.body)
      return response.status(201).json({ results: tags })
    } else {
      return response.status(400).json({
        messege: 'missing fields', fields: {
          publication_tags_id: 'BIGINT *',
          name: 'string *'
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

const getTagsById = async (request, response, next) => {
  try {
    let { id } = request.params
    let tags = await tagsService.getTagsOr404(id)
    return response.json({ results: tags })
  } catch (error) {
    next(error)
  }
}

const updateTags = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let user = await tagsService.updateTags(id, body)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeTags = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await tagsService.removeTags(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTags,
  addTags,
  getTagsById,
  updateTags,
  removeTags,
}