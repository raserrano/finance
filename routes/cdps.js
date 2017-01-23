var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
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
    })
    //POST a new Cdp
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var amount = req.body.amount;
        var days = req.body.days;
        var interest = req.body.interest;
        var active = req.body.active;
        mongoose.model('Cdp').create({
            amount: amount,
            days: days,
            interest: interest,
            active: active
          }, function (err, Cdp) {
              if (err) {
                  res.send(err);
              } else {
                  //Cdp has been created
                  console.log('POST creating new Cdp: ' + Cdp);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
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
        })
    });

/* GET New Cdp page. */
router.get('/new', function(req, res) {
    res.render('cdps/new', { title: 'Add New Cdp' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Cdp').findById(id, function (err, Cdp) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(Cdp);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Cdp').findById(req.id, function (err, Cdp) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + Cdp._id);
        var Cdpdob = Cdp.dob.toISOString();
        Cdpdob = Cdpdob.substring(0, Cdpdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('cdps/show', {
                "Cdpdob" : Cdpdob,
                "Cdp" : Cdp
              });
          },
          json: function(){
              res.json(Cdp);
          }
        });
      }
    });
  });

router.route('/:id/edit')
  //GET the individual Cdp by Mongo ID
  .get(function(req, res) {
      //search for the Cdp within Mongo
      mongoose.model('Cdp').findById(req.id, function (err, Cdp) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the Cdp
              console.log('GET Retrieving ID: ' + Cdp._id);
              var Cdpdob = Cdp.dob.toISOString();
              Cdpdob = Cdpdob.substring(0, Cdpdob.indexOf('T'))
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('cdps/edit', {
                            title: 'Cdp' + Cdp._id,
                            "Cdpdob" : Cdpdob,
                            "Cdp" : Cdp
                        });
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(Cdp);
                   }
              });
          }
      });
  })
  //PUT to update a Cdp by ID
  .put(function(req, res) {
      // Get our REST or form values. These rely on the "name" attributes
      var name = req.body.name;
      var badge = req.body.badge;
      var dob = req.body.dob;
      var company = req.body.company;
      var isloved = req.body.isloved;

      //find the document by ID
      mongoose.model('Cdp').findById(req.id, function (err, Cdp) {
          //update it
          Cdp.update({
              name : name,
              badge : badge,
              dob : dob,
              isloved : isloved
          }, function (err, CdpID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                    //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                    res.format({
                        html: function(){
                             res.redirect("/cdps/" + Cdp._id);
                       },
                       //JSON responds showing the updated values
                      json: function(){
                             res.json(Cdp);
                       }
                    });
             }
          })
      });
  })
  //DELETE a Cdp by ID
  .delete(function (req, res){
      //find Cdp by ID
      mongoose.model('Cdp').findById(req.id, function (err, Cdp) {
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

module.exports = router;