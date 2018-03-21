var express = require('express'),
router = express.Router(),
User = require('../model/users'), // Mongo connection
bodyParser = require('body-parser'), // Parses information from POST
methodOverride = require('method-override'); // Used to manipulate POST

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index',{title:'Welcome'});
});

router.route('/login').post(function(req, res) {
  User.find({username:req.body.username},function(err,User) {
    if (err) {
      res.send(err);
    } else {
      console.log(JSON.stringify(User));
      res.format({
        json: function() {
          res.json(User);
        },
      });
    }
  });
});

module.exports = router;
