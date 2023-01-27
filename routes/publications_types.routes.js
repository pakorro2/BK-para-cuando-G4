const express = require('express')
const router = express.Router()
const {
  getAllPublicationsTypes,
  getPublicationType,
  addPublicationType,
  updatePublicationType,
  removePublicationType,
} = require('../controllers/publications_types.controller')

router.get('/', getAllPublicationsTypes)
router.post('/', addPublicationType)
router.get('/:id', getPublicationType)
router.put('/:id', updatePublicationType)
router.delete('/:id', removePublicationType)

module.exports = router
