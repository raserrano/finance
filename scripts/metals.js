var request = require('request');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var config = require('../config/dev.js');
var Metal = require('../model/metals');

function saveMetal(body){
  const $ = cheerio.load(body)

  var metal = new Metal({
    price: $('.dailyPrice').text().trim().replace(/,/g , ""),
    type: 'Troy Ounce'
  });

  mongoose.createConnection(config.database.conn(config.database.options));
  mongoose.model('Metal').create(metal,function(err){
    if (err) throw err;
  });
  mongoose.connection.close();
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveMetal(body);
}
request.get(config.metals.gold,callback);
request.get(config.metals.silver,callback);