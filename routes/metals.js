var express = require('express'),
    router = express.Router(),
    Metal = require('../model/metals'), // Mongo connection
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
  var limit = 30;
  if(req.query.period){
    limit = req.query.period;
  }
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate()-limit);
  Metal.find({created_at:{$gt:cutoff}}).sort({created_at: -1}).exec(
    function(err, metals) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function() {
            res.render('metals/index', {
              title: 'Daily metals price',
              metals: metals,
            });
          },
        });
      }
    }
  );
});

module.exports = router;