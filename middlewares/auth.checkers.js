const models = require('../database/models')

const isRoleAdmin = (request, response, next) => {
  if (request.user.role === 'admin') {
    next()
  } else {
    response.status(401).json({ message: 'Permission Denied' })
  }
}
const isAdminOrSameUser = (request, response, next) => {

  if (request.user.role === 'admin' || request.user.user_id === request.params.id) {
    next()
  } else {
    response.status(401).json({ message: 'Permission Denied' })
  }
}
const isTheSameUser = async (request, response, next) => {
  const id = request.params.id
  const profile_id = request.user.profile_id
  const isTheuser = await models.Users.findOne({
    where: {
      id,
      profile_id
    }
  })

  if (isTheuser) {
    next()
  } else {
    response.status(401).json({ message: 'Permission Denied' })
  }
}

module.exports = {
  isRoleAdmin,
  isAdminOrSameUser,
  isTheSameUser
}