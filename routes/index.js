const express = require('express')
const router = express.Router()

const apiRouter = require('./api')
router.use('/api', apiRouter)

const authRouter = require('./auth')
router.use('/auth', authRouter)

module.exports = router
