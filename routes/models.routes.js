const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../libs/swagger.json')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const publicationsTypesRouter = require('./publications_types.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
  router.use('/auth', routesAuth)
  router.use('/publications-types', publicationsTypesRouter)
  router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  // other models here

  
}

module.exports = routerModels