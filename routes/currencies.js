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

router.route('/').get(function (req, res, next) {
  let limit = 30
  if (req.query.period) {
    limit = parseInt(req.query.period)
  }
  Currency.find({}).sort({ created_at: -1 }).limit(limit).exec(
    function (err, currencies) {
      if (err) {
        return console.error(err)
      } else {
        res.format({
          html: function () {
            res.render('currencies/index', {
              title: 'CRC:USD Currency',
              currencies: currencies
            })
          },
          json: function () {
            res.json(currencies)
          }
        })
      }
    }
  )
})

module.exports = router
