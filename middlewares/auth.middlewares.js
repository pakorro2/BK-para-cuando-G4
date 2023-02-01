const JwtStrategy = require('passport-jwt').Strategy

// const BearerStrategy = require('passport-http-bearer').Strategy
const passport = require('passport')

// const UsersService = require('../services/users.service')
const models = require('../database/models')
const ExtractJwt = require('passport-jwt/').ExtractJwt //? Extrae los token de los headers de mi peticion
// const passport = require('passport')
const jwtSecret = process.env.JWT_SECRET

// const userService = new UsersService()


// passport.use('bearer', new BearerStrategy(
//   (token, done) => {
//     userService.findUserByToken(token, (err, user) => {
//       if (err) { 
//         return done(err) 
//       }
//       if (!user) { 
//         return done(null, false) 
//       }

//       return done(null, user, { scope: 'all' })
//     })
//   }
// ))



const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSecret
}
passport.use(
  new JwtStrategy(options, async (tokenDecoded, done) => {
    //? done(error, tokenDecoded)
    const user = await models.Users.findByPk(tokenDecoded.user_id)
    try {
      if (!user) {
        return done(null, false)
      }
      return done(null, tokenDecoded)
    } catch (error) {
      return done(error, false)
    }
  }))



module.exports = passport