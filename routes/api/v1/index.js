const express = require('express')
const router = express.Router()

const eesRouter = require('./ees')
router.use('/ees', eesRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
