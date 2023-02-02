const express = require('express')
const router = express.Router()
const passport = require('../middlewares/auth.middlewares')
const { isRoleAdmin, isAdminOrSameUser, isTheSameUser } = require('../middlewares/auth.checkers')

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller')
const { getUserVotes } = require('../controllers/votes.controller')
const { getAllPublicationByUser } = require('../controllers/publications.controller')

router.get('/', passport.authenticate('jwt', { session: false }), isRoleAdmin, getUsers)
router.post('/', passport.authenticate('jwt', { session: false }), isRoleAdmin, addUser)
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminOrSameUser, getUser)
router.put('/:id', passport.authenticate('jwt', { session: false }), isTheSameUser, updateUser)
router.delete('/:id', isAdminOrSameUser, removeUser)
router.get('/:id/votes', passport.authenticate('jwt', { session: false }), getUserVotes)
router.get('/:id/publications', passport.authenticate('jwt', { session: false }), getAllPublicationByUser)

module.exports = router