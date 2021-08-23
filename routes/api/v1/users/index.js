const express = require('express')
const router = express.Router()
const { User } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const users = await User.findAll()

  res.send(users)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const user = await User.findOne({ where: { id } })

  res.send(user)
})

router.post('/', auth, async function (req, res, next) {
  const user = await User.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(user)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await User.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const user = await User.findOne({ where: { id } })

  user.username = req.body.username

  user.passwordHash = req.body.passwordHash

  user.save()

  res.send(user)
})

module.exports = router
