var request = require('request');
var mongoose = require('mongoose');
var config = require('../config/dev.js');
var Currency = require('../model/currencies');

function saveCurrency(body){
  var data = JSON.parse(body);
  var currency = new Currency({
    buy: data.TipoCambioCompra.replace(/,/g , "."),
    sell: data.TipoCambioVenta.replace(/,/g , "."),
  });
  mongoose.connect(config.database.uri_dev);
  mongoose.model('Currency').create(currency,function(err){
    if (err) throw err;
  });
  mongoose.connection.close()
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveCurrency(body);
}
request.get(config.webservice,callback);