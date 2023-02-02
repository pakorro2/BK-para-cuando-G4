const router = require('express').Router()
const passport = require('../middlewares/auth.middlewares')
const publicationsController = require('../controllers/publications.controller')
const { addOrDeleteVote } = require('../controllers/votes.controller')
const middlewares = require('../middlewares/auth.checkers')

router.get('/', publicationsController.getAllPublications)
router.post('/', passport.authenticate('jwt', { session: false }), publicationsController.postPublication)
router.get('/:id', publicationsController.getPublicationById)
router.delete('/:id', passport.authenticate('jwt', { session: false }), middlewares.isAdminOrSameUserPublication,publicationsController.deletePublication)
router.get('/:id/vote', passport.authenticate('jwt', { session: false }), addOrDeleteVote)
// router.put('/:id', passport.authenticate('jwt', { session: false }), publicationsController.updatePublication)

module.exports = router
