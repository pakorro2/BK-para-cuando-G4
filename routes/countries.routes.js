const express = require('express')
const router = express.Router()

const countriesController = require('../controllers/countries.controller')

router.get('/', countriesController.getCountries)
// router.post('/countries', countriesController.addCountry)
// router.get('/countries/:id', countriesController.getCountry)
// router.put('/countries/:id', countriesController.updateCountry)
// router.delete('/countries/:id', countriesController.removeCountry)

module.exports = router