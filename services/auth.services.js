
const { comparePassword } = require('../utils/crypto')
const { CustomError } = require('../utils/custom-error')
const models = require('../database/models')


const chekUserCredential = async (email, password) => {
  const user = await models.Users.findOne({ where: { email } })
  try {
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword) {
      return user
    }
    return null
  } catch (error) {
    return null
  }
}

module.exports = chekUserCredential
