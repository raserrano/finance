var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // Mongo connection
    bodyParser = require('body-parser'), // Parses information from POST
    methodOverride = require('method-override'); // Used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/').get(function(req, res, next) {
  mongoose.model('Currency').find({}).sort({created_at: -1}).limit(30).exec(
    function(err, currencies) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function() {
            res.render('currencies/index', {
              title: 'CRC:USD Currency',
              currencies: currencies,
            });
          },
          json: function() {
            res.json(currencies);
          },
        });
      }
    }
  );
});

module.exports = router;