var request = require('request'),
    cheerio = require('cheerio'),
    wait = require('wait.for'),
    utils = require('../model/utils'),
    conf = require('../config/current'),
    db = require('../model/db');

var date_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td';
var buy_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td';
var sell_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td';

function getURL(year, counter) {
  var base_url = 'http://indicadoreseconomicos.bccr.fi.cr/' +
    'indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx';
  var request = null;
  if (counter != 1) {
    request = base_url +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + (year + 1) + '/01/01&Filtro=' + counter;
  } else {
    request = base_url +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + year + '/01/01&Filtro=' + counter;
  }
  return request;
}

wait.launchFiber(function() {
  var year = conf.env.YEAR();
  for (var i = 366; i > 0; i--) {
    conf.webservice.url = getURL(year,i);
    var res = wait.for(request,conf.webservice)
    var $ = cheerio.load(res.body);
    var from = utils.getDate($(date_locator).text().trim());
    if(from != null && from != ''){
      from = new Date(from);
      var currency = {
        buy: $(buy_locator).text().trim().replace(/,/g , '.'),
        sell: $(sell_locator).text().trim().replace(/,/g , '.'),
        created_at: from,
      };
      wait.for(utils.upsertCurrency,currency);
    }
  }
  //  Var res = wait.for(utils.upsertCurrency,currency)
  console.log('Finish updating currency');
  process.exit();
});