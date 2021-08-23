const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')
const { auth } = require('../../middlewares/auth')

const router = express.Router()
const jwtSecretSigningKey = process.env.JWT_SIGNING_SECRET_KEY

/**
 * A no-op route for a client to get a CSRF token
 * through `set-cookie` header if it needs one.
 */
router.get('/csrf', async function (req, res) {
  return res.status(200).send({
    message: 'CSRF token has been provided',
  })
})

router.post('/register', async function (req, res) {
  const { username, password, passwordConfirm, ...fields } = req.body

  if (!username || !password) {
    return res.status(400).send({
      username: 'This field is required',
      password: 'This field is required',
    })
  }

  if (password !== passwordConfirm) {
    return res.status(400).send({
      passwordConfirm: 'The two passwords are different',
    })
  }

  const users = await User.findAll({ where: { username } })
  if (users.length) {
    return res.status(401).send({
      error: 'A user with this username already exists',
    })
  }

  // TODO check password difficulty

  const hash = await bcrypt.hash(password, 10)

  const user = await User.build({
    username,
    passwordHash: hash,
    ...fields,
  }).save()

  return res.status(201).send({
    username,
  })
})

router.post('/login', async function (req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({
      username: 'required',
      password: 'required',
    })
  }

  const user = await User.findOne({ where: { username } })
  if (!user) {
    return res.status(401).send({
      error: 'Invalid credentials',
    })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).send({
      error: 'Invalid credentials',
    })
  }

  const token = jwt.sign({ id: user.id }, jwtSecretSigningKey)
  res.cookie('token', token, { maxAge: 900000, httpOnly: true })

  return res.status(200).send({
    message: 'Logged in successfully',
  })
})

router.get('/logout', async function (req, res, next) {
  res.cookie('token', '', { maxAge: 0 })
  return res.status(200).send({
    message: 'Logged out successfully',
  })
})

router.get('/me', auth, async function (req, res, next) {
  res.send({
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  })
})

module.exports = router
