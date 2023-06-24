const express = require('express')
const router = express.Router()
const Metal = require('../model/metals') // Mongo connection
const bodyParser = require('body-parser') // Parses information from POST
const methodOverride = require('method-override') // Used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

router.route('/').get(async function (req, res, next) {
  let limit = 30
  if (req.query.period) {
    limit = req.query.period
  }
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - limit)
  const metals = await Metal.find({ created_at: { $gt: cutoff } }).sort({ created_at: -1 }).exec()
  res.format({
    html: function () {
      res.render('metals/index', {
        title: 'Daily metals price',
        metals
      })
    }
  })
})

module.exports = router
