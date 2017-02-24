var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/')
  .get(function(req, res, next) {
    mongoose.model('Metal').find({}).sort({created_at:-1}).exec(function (err, metals) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function(){
            res.render('metals/index', {
            title: 'Daily metals price',
            "metals" : metals
            });
          },
          //JSON response will show all metals in JSON format
          json: function(){
            res.json(metals);
          }
        });
      }     
    });
});

module.exports = router;