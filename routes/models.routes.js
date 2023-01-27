const express = require('express')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const publicationsTypesRouter = require('./publications_types.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
  router.use('/auth', routesAuth)
  router.use('/publications-types', publicationsTypesRouter)
  // other models here

  
}

module.exports = routerModels