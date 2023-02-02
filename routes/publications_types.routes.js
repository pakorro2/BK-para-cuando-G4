const express = require('express')
const router = express.Router()
const publicationsTypesController = require('../controllers/publications_types.controller')

router.get('/', publicationsTypesController.getAllPublicationsTypes)
router.get('/:id', publicationsTypesController.getPublicationType)
// router.post('/', publicationsTypesController.addPublicationType)
// router.put('/:id', publicationsTypesController.updatePublicationType)
// router.delete('/:id', publicationsTypesController.removePublicationType)

module.exports = router
