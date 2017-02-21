var request = require('request');
var mongoose = require('mongoose');
var config = require('../config/prod.js');
var Currency = require('../model/currencies');

function saveCurrency(body){
  var data = JSON.parse(body);
  var currency = new Currency({
    buy: data.TipoCambioCompra.replace(/,/g , "."),
    sell: data.TipoCambioVenta.replace(/,/g , "."),
  });

  mongoose.connect(config.database.conn(config.database.options));
  mongoose.model('Currency').create(currency,function(err){
    if (err) throw err;
  });
  mongoose.connection.close();
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveCurrency(body);
}
request.get(config.webservice,callback);