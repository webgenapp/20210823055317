const express = require('express')
const router = express.Router()
const { Ee } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const ees = await Ee.findAll()

  res.send(ees)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const ee = await Ee.findOne({ where: { id } })

  res.send(ee)
})

router.post('/', auth, async function (req, res, next) {
  const ee = await Ee.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(ee)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Ee.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const ee = await Ee.findOne({ where: { id } })

  ee.e = req.body.e

  ee.save()

  res.send(ee)
})

module.exports = router
