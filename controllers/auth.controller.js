const jwt = require('jsonwebtoken')
const { chekUserCredential, createUserAndProfile, checkInfoToken } = require('../services/auth.services')
const UsersService = require('../services/users.service')
const jwtSecret = process.env.JWT_SECRET

const userService = new UsersService()

const postLogin = (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    chekUserCredential(email, password)
      .then(data => {
        if (data) {
          const token = jwt.sign({
            id: data.id,
            username: data.username,
            profile_id: data.Profiles[0].id,
            role: data.Profiles[0].Role.name
          }, jwtSecret)
          userService.updateUser(data.id, { token: token })
          res.status(200).json({ message: 'Correct credentials', token })
        } else {
          console.log(data)
          res.status(401).json({ message: 'Email or password is incorrect' })
        }
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({ message: 'Missing data', fields: { email: 'example@example.com', password: 'string' } })
  }
}
const postSignUp = async (request, response, next) => {
  try {
    let { first_name, last_name, email, password, username } = request.body
    if (first_name && last_name && email && password && username) {
      let user = await createUserAndProfile(request.body)
      console.log(user)
      return response.status(201).json({
        results: {
          user: user.newUser,
          profile: user.newProfile
        }
      })
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

const getMyUser = async (request, response, next) => {
  try {
    const id = request.user.id
    console.log(id)
    const userInfo = await checkInfoToken(id)
    return response.status(201).json({ result: userInfo })
  } catch (error) {
    next(error)
  }

}


module.exports = {
  postLogin,
  postSignUp,
  getMyUser
}