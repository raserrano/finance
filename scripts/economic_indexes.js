var request = require('request');
var config = require('../config/current');
var db = require('../model/db');

function saveCurrency(body){
  var data = JSON.parse(body);
  var currency = {
    buy: data.TipoCambioCompra.replace(/,/g , "."),
    sell: data.TipoCambioVenta.replace(/,/g , "."),
  };

  console.log(currency);
  db.model('Currency').create(currency,function(err){
    if (err) throw err;
    db.connection.close();
  });
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveCurrency(body);
}
request.get(config.webservice,callback);