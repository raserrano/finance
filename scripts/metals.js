var request = require('request'),
  cheerio = require('cheerio'),
  wait = require('wait.for'),
  config = require('../config/current'),
  db = require('../model/db');

function saveMetal(body,type) {
  var $ = cheerio.load(body);

  var metal = {
    price: $('.dailyPrice').text().trim().replace(/,/g , ''),
    type: 'Troy Ounce',
    metal: type,
  };
  // Price converted from cents to dollar
  if (metal.metal == 'silver') {
    metal.price = (metal.price / 100);
  }
  // Price per metric ton converted to price per troy ounce
  if (metal.metal == 'aluminum' || metal.metal == 'copper') {
    metal.price = (metal.price / 32150.7);
  }
  // Price per gallon converted to price per barrel
  if (metal.metal == 'gasoline' || metal.metal == 'diesel') {
    metal.price = (metal.price * 42);
  }
  db.model('Metal').create(metal,function(err) {
    if (err) {
      throw err;
    }
  });
}

wait.launchFiber(function() {
  var types = config.metals;
  for(var key in types){
    var metal = wait.for(request,types[key]);
    saveMetal(metal.body,key);
  }
  console.log('Finish updating metals');
  process.exit();
});