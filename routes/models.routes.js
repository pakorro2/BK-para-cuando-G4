const express = require('express')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../libs/swagger.json')

function routerModels(app) {
  const router = express.Router()

  router.use('/users', routesUsers)
  router.use('/auth', routesAuth)
  router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  // other models here
}