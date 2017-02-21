var request = require('request');
var config = require('../config/current');
var Currency = require('../model/currencies');

function saveCurrency(body){
  var data = JSON.parse(body);
  var currency = new Currency({
    buy: data.TipoCambioCompra.replace(/,/g , "."),
    sell: data.TipoCambioVenta.replace(/,/g , "."),
  });

  Currency.create(currency,function(err){
    if (err) throw err;
  });
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveCurrency(body);
}
request.get(config.webservice,callback);