const express = require('express')
const router = express.Router()

const rolesController = require('../controllers/roles.controller')

router.get('/', rolesController.getRoles)
// router.post('/roles', rolesController.addRole)
// router.get('/roles/:id', rolesController.getRole)
// router.put('/roles/:id', rolesController.updateRole)
// router.delete('roles/:id', rolesController.removeRole)

module.exports = router