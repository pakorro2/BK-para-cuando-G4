const express = require('express')
const router = express.Router()
const passport = require('../middlewares/auth.middlewares')
const {
  getTags,
  addTags,
  getTagsById,
  updateTags,
  removeTags,
} = require('../controllers/tags.controller')

router.get('/tags', getTags)
router.post('/tags', passport.authenticate('jwt', { session: false }), addTags)
router.get('tags/:id',passport.authenticate('jwt', { session: false }), getTagsById)
router.put('tags/:id', passport.authenticate('jwt', { session: false }), updateTags)
router.delete('tags/:id',passport.authenticate('jwt', { session: false }), removeTags)

//!falta ruta de publications
//?se usa solamente id o tag_id
module.exports = router