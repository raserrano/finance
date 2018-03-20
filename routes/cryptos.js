var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // Mongo connection
    bodyParser = require('body-parser'), // Parses information from POST'
    utils = require('../model/utils'),
    wait = require('wait.for'),
    methodOverride = require('method-override'); // Used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/').get(function(req, res, next) {
  var markets = {};
  wait.launchFiber(function() {
    markets = wait.for(utils.getMarkets);
  });
  console.log(markets);
  mongoose.model('Crypto').find().sort({amount:-1}).exec(
    function(err, cryptos) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function() {
            res.render('cryptos/index', {
              title: 'Daily cryptos price',
              cryptos: cryptos,
              markets: markets,
            });
          },
        });
      }
    }
  );
});

module.exports = router;