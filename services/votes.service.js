const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')

