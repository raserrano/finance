const express = require('express')
const router = express.Router()
const Crypto = require('../model/cryptos') // Mongo connection
const bodyParser = require('body-parser') // Parses information from POST'
const utils = require('../model/utils')
const wait = require('wait.for')
const db = require('../model/db')
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
  wait.launchFiber(function () {
    const markets = wait.for(utils.getMarkets)
    const cryptos = wait.for(utils.getCryptos)
    res.format({
      html: function () {
        res.render('cryptos/index', {
          title: 'Daily cryptos price',
          cryptos: cryptos,
          markets: markets
        })
      }
    })
  })
})

router.route('/add').post(function (req, res) {
  Crypto.create(req.body, function (err, crypto) {
    if (err) {
      res.send(err)
    } else {
      res.format({
        json: function () {
          res.json(crypto)
        }
      })
    }
  })
})

router.route('/delete').post(function (req, res) {
  Crypto.findById(req.body.id, function (err, crypto) {
    if (err) {
      return console.error(err)
    } else {
      Crypto.remove(function (err, crypto) {
        if (err) {
          return console.error(err)
        } else {
          res.format({
            json: function () {
              res.json(crypto)
            }
          })
        }
      })
    }
  })
})

module.exports = router
