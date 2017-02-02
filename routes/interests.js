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
    mongoose.model('Interest').find({}, function (err, interests) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function(){
            res.render('interests/index', {
            title: 'All CDPs',
            "interests" : interests
            });
          },
          //JSON response will show all interests in JSON format
          json: function(){
            res.json(interests);
          }
        });
      }     
    });
});

router.route('/add')
  .post(function(req, res) {
    mongoose.model('Interest').create(req.body,function(err,Interest){
      if(err){
        res.send(err);
      }else{
        res.format({
          html: function(){
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("interests");
            // And forward to success page
            res.redirect("/interests");
          },
          //JSON response will show the newly created Interest
          json: function(){
            res.json(Interest);
          }
        });
      }
    });
});

router.route('/delete').post(function(req, res) {
  mongoose.model('Interest').findById(req.body.id, function (err, interest) {
    if (err) {
      return console.error(err);
    } else {
      interest.remove(function (err, interest) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function(){
            res.redirect("/interests");
          },
          json: function(){
            res.json({message : 'deleted',
              item : interest
            });
          }
        });
        }
      });
    }
  });
});

router.route('/edit').post(function(req, res) {
  mongoose.model('Interest').findById(req.body.id, function (err, interest) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      interest.update(req.body, function (err, interestID) {
        if (err) {
          res.send("There was a problem updating the information to the database: " + err);
        } 
        else {
        res.format({
          html: function(){
            res.redirect("/interests/");
          },
          json: function(){
            res.json(interest);
          }
          });
        }
      });
    }
  });
});

module.exports = router;