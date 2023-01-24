const JwtStrategy = require('passport-jwt').Strategy


const ExtractJwt = require('passport-jwt/').ExtractJwt //? Extrae los token de los headers de mi peticion
const passport = require('passport')
const jwtSecret = process.env.JWT_SECRET
const models = require('../database/models')


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSecret
}
passport.use(
  new JwtStrategy(options, async (tokenDecoded, done) => {
    //? done(error, tokenDecoded)
    const user = await models.Users.findByPk(tokenDecoded.id)
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