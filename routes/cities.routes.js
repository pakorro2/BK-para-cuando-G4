const express = require('express')
const router = express.Router()

const citiesController = require('../controllers/cities.controller')

router.get('/', citiesController.getCities)
// router.post('/', citiesController.addCity)
// router.get('/:id', citiesController.getCity)
// router.put('/:id', citiesController.updateCity)
// router.delete('/:id', citiesController.removeCity)

module.exports = router