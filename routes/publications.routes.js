const express = require('express')
const router = express.Router()
const passport = require('../middlewares/auth.middlewares')
const publicationsController = require('../controllers/publications.controller')

router.get('/', publicationsController.getAllPublications)
router.post('/', passport.authenticate('jwt', { session: false }), publicationsController.postPublication)
router.get('/:id', publicationsController.getPublicationById)
router.get('/:id/vote', passport.authenticate('jwt', { session: false }), publicationsController.addVote)
router.put('/:id', passport.authenticate('jwt', { session: false }), publicationsController.updatePublication)
router.delete('/:id', passport.authenticate('jwt', { session: false }), publicationsController.deletePublication)

module.exports = router
