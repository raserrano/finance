var express = require('express'),
    router = express.Router(),
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
  res.format({
    html: function() {
      res.render('loans/index', {
        title: 'Loans',
      });
    },
  });
});

router.route('/calculate').post(function(req,res,nex){
  var amount = req.body.amount;
  var period =req.body.period;
  var rate =req.body.rate;
  var payment = 506;
  var data =[];
  while(period > 0){
      var interest = ((rate/100)/12)*amount;
      amortization = payment - interest;
      amount = amount - amortization;
      data.push({
          'period':period,
          'amount': amount,
          'interest':interest,
          'amortization':amortization,
      });
      period--;
  }
  res.format({
    html: function() {
      res.render('loans/results', {
        title: 'Loans',
        data:data
      });
    },
  });
});

module.exports = router;