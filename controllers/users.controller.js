const UsersService = require('../services/users.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {

  try {
    let { first_name, last_name, email, password, username } = request.body
    if (first_name && last_name && email && password && username) {
      console.log(request.body)
      let user = await usersService.createUser(request.body)
      return response.status(201).json({ results: user })
    } else {
      return response.status(400).json({
        messege: 'missing fields', fields: {
          first_name: 'string *',
          last_name: 'string *',
          username: 'string *',
          email: 'example@gmail.com *',
          password: 'string *',
          image_url: 'url',
          code_phone: 'number',
          phone: 'number',
          country_id: 'integer'
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await usersService.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let user = await usersService.updateUser(id, body)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: `the user ${user.first_name} ${user.last_name} whit ID: ${user.id} has beed removed`, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
}