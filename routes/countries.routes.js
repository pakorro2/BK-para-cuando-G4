const express = require('express')
const router = express.Router()
const passportJWT = require('../middlewares/auth.middlewares')
const {
    getCountries,
    addCountry,
    getCountry,
    updateCountry,
    removeCountry,
} = require('../controllers/cities.controller')

router.get('/countries', getCountries)
router.post('/countries', addCountry)
router.get('/countries/:id', getCountry)
router.put('/countries/:id', updateCountry)
router.delete('/countries/:id', removeCountry)

module.exports = router