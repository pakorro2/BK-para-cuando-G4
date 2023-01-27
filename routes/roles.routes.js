const express = require('express')
const router = express.Router()

const {
  getRoles,
  addRole,
  getRole,
  updateRole,
  removeRole,
} = require('../controllers/roles.controller')

router.get('/roles', getRoles)
router.post('/roles', addRole)
router.get('/roles/:id', getRole)
router.put('/roles/:id', updateRole)
router.delete('roles/:id', removeRole)

module.exports = router