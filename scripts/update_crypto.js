var request = require('request'),
  wait = require('wait.for'),
  config = require('../config/current'),
  utils = require('../model/utils'),
  db = require('../model/db');


wait.launchFiber(function() {
  var markets = wait.for(
    request,
    config.crypto.url
  );
  var cryptos = JSON.parse(markets.body).result;
  for(var i=0; i<cryptos.length; i++){
    var query = {name: cryptos[i].MarketName};
    var doc = {
      name: cryptos[i].MarketName,
      low: cryptos[i].Low,
      high: cryptos[i].High,
      vol: cryptos[i].Volume,
      last: cryptos[i].Last,
      updated: new Date(),
    }
    wait.for(utils.upsertMarket,query,doc);
  }
  console.log('Finish updating crypto markets');
  process.exit();
});