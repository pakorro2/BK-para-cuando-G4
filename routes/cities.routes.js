const express = require('express')
const router = express.Router()
const passportJWT = require('../middlewares/auth.middlewares')
const {
    getCities,
    addCity,
    getCity,
    updateCity,
    removeCity,
} = require('../controllers/cities.controller')

router.get('/cities', getCities)
router.post('/cities', addCity)
router.get('/cities/:id', getCity)
router.put('/cities/:id', updateCity)
router.delete('cities/:id', removeCity)

module.exports = router