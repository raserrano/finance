var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), // Mongo connection
bodyParser = require('body-parser'), // Parses information from POST
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
  mongoose.model('Cdp').find({}, function(err, cdps) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function() {
          res.render('cdps/index', {
            title: 'All CDPs',
            cdps: cdps,
          });
        },
        json: function() {
          res.json(cdps);
        },
      });
    }
  });
});

router.route('/add').post(function(req, res) {
  mongoose.model('Cdp').create(req.body,function(err,Cdp) {
    if (err) {
      res.send(err);
    } else {
      res.format({
        html: function() {
          res.location('cdps');
          res.redirect('/cdps');
        },
        json: function() {
          res.json(Cdp);
        },
      });
    }
  });
});

router.route('/delete').post(function(req, res) {
  mongoose.model('Cdp').findById(req.body.id, function(err, cdp) {
    console.log(req.body);
    if (err) {
      return console.error(err);
    } else {
      mongoose.model('Cdp').remove(function(err, cdp) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            html: function() {
              res.redirect('/cdps');
            },
            json: function() {
              res.json({
                message: 'deleted',
                item: cdp,
              });
            },
          });
        }
      });
    }
  });
});

router.route('/edit').post(function(req, res) {
  mongoose.model('Cdp').findById(req.body.id, function(err, cdp) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      mongoose.model('Cdp').update(req.body, function(err, cdpID) {
        if (err) {
          res.send(
            'There was a problem updating the information to the database: ' +
            err
          );
        } else {
          res.format({
            html: function() {
              res.redirect('/cdps/');
            },
            json: function() {
              res.json(cdp);
            },
          });
        }
      });
    }
  });
});

module.exports = router;