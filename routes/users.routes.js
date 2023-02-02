const express = require('express')
const router = express.Router()
const passport = require('../middlewares/auth.middlewares')
const { isRoleAdmin, isAdminOrSameUser } = require('../middlewares/auth.checkers')

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')
const { getUserVotes } = require('../controllers/votes.controller')

router.get('/', passport.authenticate('jwt', { session: false }), isRoleAdmin, getUsers)
router.post('/', passport.authenticate('jwt', { session: false }), addUser)
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminOrSameUser, getUser)
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser)
router.delete('/:id', isAdminOrSameUser, removeUser)
router.get('/:id/votes', passport.authenticate('jwt', { session: false }), getUserVotes)

module.exports = router