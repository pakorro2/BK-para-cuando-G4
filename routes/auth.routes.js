const router = require('express').Router()
const { postLogin, postSignUp, getMyUser } = require('../controllers/auth.controller')
const passport = require('../middlewares/auth.middlewares')


router.post('/login', postLogin)

router.post('/sign-up', postSignUp)
router.get('/user-info', passport.authenticate('jwt', { session: false }), getMyUser)


module.exports = router
