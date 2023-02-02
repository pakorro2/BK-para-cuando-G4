const PublicationsService = require('../services/publications.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsService = new PublicationsService()

const getAllPublications = async (request, response, next) => {
  try {
    const query = request.query
    const { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    const publication = await publicationsService.findAndCount(query)
    const results = getPagingData(publication, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const getPublicationById = async (request, response, next) => {
  try {
    const id = request.params.id
    const publication = await publicationsService.findPublicationById(id)
    return response.status(200).json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const postPublication = async (request, response, next) => {
  try {
    const user_id = request.user.user_id
    const publicationData = request.body
    if (!(publicationData.publication_type_id && publicationData.city_id && publicationData.title && publicationData.content)) {
      response.status(400).json({
        message: 'empty fields',
        fields: {
          publication_type_id: 'integer *',
          city_id: 'integer *',
          title: 'string *',
          description: 'string',
          content: 'string *',
          picture: 'string',
          image_url: 'string'
        }
      })
    }
    const publication = await publicationsService.createPublication(user_id, publicationData)
    return response.status(201).json({ results: publication, message: 'created successfully' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updatePublication = async (request, response, next) => {
  try {
    const id = request.params.id
    const data = request.body
    const publication = await publicationsService.updatePublication(id, data)
    return response.status(200).json({ results: publication, message: 'updated successfully' })
  } catch (error) {
    next(error)
  }
}

const deletePublication = async (request, response, next) => {
  try {
    const id = request.params.id
    const publication = await publicationsService.destroyPublication(id)
    return response.json({ results: publication, message: 'removed successfully' })
  } catch (error) {
    next(error)
  }
}

const addVote = async (request, response, next) => {
  try {
    const user_id = request.user.user_id
    const publication_id = request.params.id
    const vote = await publicationsService.createVote(user_id, publication_id)
    return response.status(201).json({result: vote, message: 'add vote'})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPublications,
  getPublicationById,
  postPublication,
  updatePublication,
  deletePublication,
  addVote
}