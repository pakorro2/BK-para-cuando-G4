const router = require('express').Router()
const passport = require('../middlewares/auth.middlewares')
const publicationsController = require('../controllers/publications.controller')
const { addOrDeleteVote } = require('../controllers/votes.controller')

router.get('/', publicationsController.getAllPublications)
router.post('/', passport.authenticate('jwt', { session: false }), publicationsController.postPublication)
router.get('/:id', publicationsController.getPublicationById)
router.put('/:id', passport.authenticate('jwt', { session: false }), publicationsController.updatePublication)
router.delete('/:id', passport.authenticate('jwt', { session: false }), publicationsController.deletePublication)
router.get('/:id/vote', passport.authenticate('jwt', { session: false }), addOrDeleteVote)

module.exports = router
