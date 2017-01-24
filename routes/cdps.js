var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
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

router.route('/add')
  .post(function(req, res) {
    console.log('Trying to add CDP');
    var obj = req.body;
    console.log(obj);
    mongoose.model('Cdp').create(obj,function(err,Cdp){
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
    })
});

  //       var amount = req.body.amount;
  //       var days = req.body.days;
  //       var interest = req.body.interest;
  //       var active = req.body.active;
  //       mongoose.model('Cdp').create({
  //           amount: amount,
  //           days: days,
  //           interest: interest,
  //           active: active
  //         }, function (err, Cdp) {
  //             if (err) {
  //                 res.send(err);
  //             } else {
  //                 //Cdp has been created
  //                 console.log('POST creating new Cdp: ' + Cdp);
  //                 res.format({
  //                     //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
  //                   html: function(){
  //                       // If it worked, set the header so the address bar doesn't still say /adduser
  //                       res.location("cdps");
  //                       // And forward to success page
  //                       res.redirect("/cdps");
  //                   },
  //                   //JSON response will show the newly created Cdp
  //                   json: function(){
  //                       res.json(Cdp);
  //                   }
  //               });
  //             }
  //       })
    // });

router.route('/delete').post(function(req, res) {
  console.log('Delete action');
});
router.route('/edit').post(function(req, res) {
  console.log('Edit action');
});



module.exports = router;