const express = require('express')
const router = express.Router()
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

router.route('/').get(function (req, res, next) {
  res.format({
    html: function () {
      res.render('loans/index', {
        title: 'Loans'
      })
    }
  })
})

router.route('/calculate').post(function (req, res, nex) {
  let amount = req.body.amount
  let period = req.body.period
  const rate = req.body.rate
  const payment = 506
  const data = []
  while (period > 0) {
    const interest = ((rate / 100) / 12) * amount
    amortization = payment - interest
    amount = amount - amortization
    data.push({
      period,
      amount,
      interest,
      amortization
    })
    period--
  }
  res.format({
    html: function () {
      res.render('loans/results', {
        title: 'Loans',
        data
      })
    }
  })
})

module.exports = router
