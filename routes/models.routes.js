const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../libs/swagger.json')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const rolesRouter = require('./roles.routes')
const publicationsRouter = require('./publications.routes')
const publicationsTypesRouter = require('./publications_types.routes')
const countriesRouter = require('./countries.routes')
const citiesRouter = require('./cities.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
  router.use('/auth', routesAuth)
  router.use('/roles', rolesRouter)
  router.use('/publications', publicationsRouter)
  router.use('/publications-types', publicationsTypesRouter)
  router.use('/countries', countriesRouter)
  router.use('/cities', citiesRouter)
  router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  // other models here

  
}

module.exports = routerModels