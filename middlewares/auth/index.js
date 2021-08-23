const jwt = require('jsonwebtoken')
const csurf = require('csurf')

const { User } = require('../../models')

const jwtSecretSigningKey = process.env.JWT_SIGNING_SECRET_KEY

async function auth(req, res, next) {
  const { token } = req.cookies

  if (!token) {
    return res.status(403).send({
      error: 'Auth token not provided',
    })
  }

  let decoded = null
  try {
    decoded = jwt.verify(token, jwtSecretSigningKey)
  } catch (err) {
    return res.status(403).send({
      error: 'Invalid auth token',
    })
  }
  const { id } = decoded

  const user = await User.findOne({ where: { id } })

  if (!user) {
    return res.status(403).send({
      error: 'Invalid auth token',
    })
  }

  req.user = user

  next()
}

function readCsrfCookie(req, res, next) {
  return csurf({ cookie: true })(req, res, next)
}

function setCsrfCookie(req, res, next) {
  const csrfToken = req.csrfToken()
  if (csrfToken) {
    res.cookie('csrf-token', csrfToken)
  }
  next()
}

const csrf = {
  readCookie: readCsrfCookie,
  setCookie: setCsrfCookie,
}

module.exports = {
  auth,
  csrf,
}
