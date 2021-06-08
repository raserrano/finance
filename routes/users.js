const express = require('express')
const router = express.Router()
const User = require('../model/users') // Mongo connection
const bodyParser = require('body-parser') // Parses information from POST
const methodOverride = require('method-override') // Used to manipulate POST

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users/index', { title: 'Welcome' })
})

router.route('/login').post(function (req, res) {
  User.find({ username: req.body.username }, function (err, User) {
    if (err) {
      res.send(err)
    } else {
      console.log(JSON.stringify(User))
      res.format({
        json: function () {
          res.json(User)
        }
      })
    }
  })
})

module.exports = router
