const router = require('express').Router()
const { postLogin } = require('../controllers/auth.controller')

router.post('/login', postLogin)
// router.post('/signUp', authServices.postSignUp)


module.exports = router
