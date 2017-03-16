var request = require('request'),
    cheerio = require('cheerio'),
    config = require('../config/current'),
    db = require('../model/db');

function saveMetal(body) {
  var $ = cheerio.load(body);

  var metal = {
    price: $('.dailyPrice').text().trim().replace(/,/g , ''),
    type: 'Troy Ounce',
    metal: $('#hidCommodity').attr('value').trim().replace(),
  };
  if(metal.metal == 'silver'){
    metal.price=(metal.price/100);
  }
  if(metal.metal == 'aluminum' || metal.metal == 'copper'){
    metal.price=(metal.price/32150.7);
  }
  db.model('Metal').create(metal,function(err) {
    if (err) {
      throw err;
    } else {
      closeDB();
    }
  });
}
function closeDB() {
  db.connection.close();
}

function callback(err, response, body) {
  if (err && response.statusCode !== 200) {
    console.log('Request error.');
  }
  saveMetal(body);
}
config.webservice.url = config.metals.gold;
request.get(config.webservice,callback);
config.webservice.url = config.metals.silver;
request.get(config.webservice,callback);
config.webservice.url = config.metals.aluminum;
request.get(config.webservice,callback);
config.webservice.url = config.metals.copper;
request.get(config.webservice,callback);
