const router = require('express').Router()
const { postLogin } = require('../controllers/auth.controller')
const { addUser } = require('../controllers/users.controller')

router.post('/login', postLogin)

router.post('/signup', addUser)


module.exports = router
