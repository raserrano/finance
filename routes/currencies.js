var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for currencies
//this will be accessible from http://127.0.0.1:3000/currencies if the default route for / is left unchanged
router.route('/')
    //GET all currencies
    .get(function(req, res, next) {
        //retrieve all currencies from Monogo
        mongoose.model('Currency').find({}, function (err, currencies) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/currencies folder. We are also setting "currencies" to be an accessible variable in our jade view
                    html: function(){
                        res.render('currencies/index', {
                              title: 'All my currencies',
                              "currencies" : currencies
                          });
                    },
                    //JSON response will show all currencies in JSON format
                    json: function(){
                        res.json(currencies);
                    }
                });
              }     
        });
    })
    //POST a new currency
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var badge = req.body.badge;
        var dob = req.body.dob;
        var company = req.body.company;
        var isloved = req.body.isloved;
        //call the create function for our database
        mongoose.model('Currency').create({
            name : name,
            badge : badge,
            dob : dob,
            isloved : isloved
        }, function (err, currency) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Currency has been created
                  console.log('POST creating new currency: ' + currency);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("currencies");
                        // And forward to success page
                        res.redirect("/currencies");
                    },
                    //JSON response will show the newly created currency
                    json: function(){
                        res.json(currency);
                    }
                });
              }
        })
    });

/* GET New Currency page. */
router.get('/new', function(req, res) {
    res.render('currencies/new', { title: 'Add New Currency' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Currency').findById(id, function (err, currency) {
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
            //console.log(currency);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Currency').findById(req.id, function (err, currency) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + currency._id);
        var currencydob = currency.dob.toISOString();
        currencydob = currencydob.substring(0, currencydob.indexOf('T'))
        res.format({
          html: function(){
              res.render('currencies/show', {
                "currencydob" : currencydob,
                "currency" : currency
              });
          },
          json: function(){
              res.json(currency);
          }
        });
      }
    });
  });

router.route('/:id/edit')
  //GET the individual currency by Mongo ID
  .get(function(req, res) {
      //search for the currency within Mongo
      mongoose.model('Currency').findById(req.id, function (err, currency) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the currency
              console.log('GET Retrieving ID: ' + currency._id);
              var currencydob = currency.dob.toISOString();
              currencydob = currencydob.substring(0, currencydob.indexOf('T'))
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('currencies/edit', {
                            title: 'Currency' + currency._id,
                            "currencydob" : currencydob,
                            "currency" : currency
                        });
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(currency);
                   }
              });
          }
      });
  })
  //PUT to update a currency by ID
  .put(function(req, res) {
      // Get our REST or form values. These rely on the "name" attributes
      var name = req.body.name;
      var badge = req.body.badge;
      var dob = req.body.dob;
      var company = req.body.company;
      var isloved = req.body.isloved;

      //find the document by ID
      mongoose.model('Currency').findById(req.id, function (err, currency) {
          //update it
          currency.update({
              name : name,
              badge : badge,
              dob : dob,
              isloved : isloved
          }, function (err, currencyID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                    //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                    res.format({
                        html: function(){
                             res.redirect("/currencies/" + currency._id);
                       },
                       //JSON responds showing the updated values
                      json: function(){
                             res.json(currency);
                       }
                    });
             }
          })
      });
  })
  //DELETE a Currency by ID
  .delete(function (req, res){
      //find currency by ID
      mongoose.model('Currency').findById(req.id, function (err, currency) {
          if (err) {
              return console.error(err);
          } else {
              //remove it from Mongo
              currency.remove(function (err, currency) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //Returning success messages saying it was deleted
                      console.log('DELETE removing ID: ' + currency._id);
                      res.format({
                          //HTML returns us back to the main page, or you can create a success page
                            html: function(){
                                 res.redirect("/currencies");
                           },
                           //JSON returns the item with the message that is has been deleted
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : currency
                                 });
                           }
                        });
                  }
              });
          }
      });
  });

module.exports = router;