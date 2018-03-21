var express = require('express'),
    router = express.Router(),
    Crypto = require('../model/cryptos'), // Mongo connection
    bodyParser = require('body-parser'), // Parses information from POST'
    utils = require('../model/utils'),
    wait = require('wait.for'),
    db = require('../model/db'),
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
  wait.launchFiber(function() {
    var markets = wait.for(utils.getMarkets);
    var cryptos = wait.for(utils.getCryptos);
    res.format({
      html: function() {
        res.render('cryptos/index', {
          title: 'Daily cryptos price',
          cryptos: cryptos,
          markets: markets,
        });
      },
    });
  });
});

router.route('/add').post(function(req, res) {
  Crypto.create(req.body,function(err, crypto) {
    if (err) {
      res.send(err);
    } else {
      res.format({
        json: function() {
          res.json(crypto);
        },
      });
    }
  });
});

router.route('/delete').post(function(req, res) {
  Crypto.findById(req.body.id, function(err, crypto) {
    if (err) {
      return console.error(err);
    } else {
      Crypto.remove(function(err, crypto) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json(crypto);
            },
          });
        }
      });
    }
  });
});

module.exports = router;