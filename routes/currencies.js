const express = require('express')
const router = express.Router()
const Currency = require('../model/currencies') // Mongo connection
const bodyParser = require('body-parser') // Parses information from POST
const methodOverride = require('method-override') // Used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
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
    limit = parseInt(req.query.period)
  }
  const currencies = await Currency.find({}).sort({ created_at: -1 }).limit(limit).exec()
  res.format({
    html: function () {
      res.render('currencies/index', {
        title: 'CRC:USD Currency',
        currencies
      })
    },
    json: function () {
      res.json(currencies)
    }
  })
})

module.exports = router
