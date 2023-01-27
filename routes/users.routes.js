const express = require('express')
const router = express.Router()
const passport = require('../middlewares/auth.middlewares')
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')

router.get('/', passport.authenticate('jwt', { session: false }), getUsers)
router.post('/', passport.authenticate('jwt', { session: false }), addUser)
router.get('/:id', getUser)
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser)
router.delete('/:id', removeUser)

module.exports = router