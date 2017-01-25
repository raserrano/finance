var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

router.route('/')
  .get(function(req, res, next) {
    mongoose.model('Cdp').find({}, function (err, cdps) {
      if (err) {
        return console.error(err);
      } else {
        res.format({
          html: function(){
            res.render('cdps/index', {
            title: 'All CDPs',
            "cdps" : cdps
            });
          },
          //JSON response will show all cdps in JSON format
          json: function(){
            res.json(cdps);
          }
        });
      }     
    });
});

router.route('/add')
  .post(function(req, res) {
    mongoose.model('Cdp').create(req.body,function(err,Cdp){
      if(err){
        res.send(err);
      }else{
        res.format({
          html: function(){
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("cdps");
            // And forward to success page
            res.redirect("/cdps");
          },
          //JSON response will show the newly created Cdp
          json: function(){
            res.json(Cdp);
          }
        });
      }
    });
});

router.route('/delete').post(function(req, res) {
  console.log('Delete action');
      mongoose.model('Cdp').findById(req.body.id, function (err, Cdp) {
          if (err) {
              return console.error(err);
          } else {
              //remove it from Mongo
              Cdp.remove(function (err, Cdp) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //Returning success messages saying it was deleted
                      console.log('DELETE removing ID: ' + Cdp._id);
                      res.format({
                          //HTML returns us back to the main page, or you can create a success page
                            html: function(){
                                 res.redirect("/cdps");
                           },
                           //JSON returns the item with the message that is has been deleted
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : Cdp
                                 });
                           }
                        });
                  }
              });
          }
      });
});

router.route('/edit').post(function(req, res) {
  console.log('Edit action');
        mongoose.model('Cdp').findById(req.id, function (err, cdp) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the blob
              console.log('GET Retrieving ID: ' + cdp._id);
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('cdps');
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(cdp);
                   }
              });
          }
      });
});

module.exports = router;