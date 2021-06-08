const express = require('express')
const router = express.Router()
const Interest = require('../model/interests') // Mongo connection
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
  Interest.find({}).sort({ created_at: -1 }).exec(
    function (err, interests) {
      if (err) {
        return console.error(err)
      } else {
        res.format({
          html: function () {
            res.render('interests/index', {
              title: 'Active Interest rates',
              interests: interests
            })
          }
        })
      }
    }
  )
})

router.route('/add').post(function (req, res) {
  Interest.create(req.body, function (err, interest) {
    if (err) {
      res.send(err)
    } else {
      res.format({
        json: function () {
          res.json(interest)
        }
      })
    }
  })
})

router.route('/delete').post(function (req, res) {
  Interest.findByIdAndRemove(req.body.id).exec(function (err, interest) {
    if (err) {
      return console.error(err)
    } else {
      res.format({
        json: function () {
          res.json(interest)
        }
      })
    }
  })
})

router.route('/edit').post(function (req, res) {
  Interest.findById(req.body.id, function (err, interest) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err)
    } else {
      Interest.update(req.body, function (err, interestID) {
        if (err) {
          res.send(
            'There was a problem updating the information to the database: ' +
            err
          )
        } else {
          res.format({
            json: function () {
              res.json(interest)
            }
          })
        }
      })
    }
  })
})

module.exports = router
