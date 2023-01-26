const express = require('express')
const router = express.Router()
const passportJWT = require('../middlewares/auth.middlewares')
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

router.get('/', getUsers)
router.post('/', addUser)
router.get('/:id', getUser)
router.put('/:id', passportJWT.authenticate('jwt', { session: false }), updateUser)
router.delete('/:id', removeUser)

module.exports = router
