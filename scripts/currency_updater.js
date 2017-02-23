var request = require('request');
var cheerio = require('cheerio');
var config = require('../config/current');
var db = require('../model/db');

var date_locator = "#theTable400 > tr:nth-child(2) > td:nth-child(1)";
var buy_locator = "#theTable400 > tr:nth-child(2) > td:nth-child(2)";
var sell_locator = "#theTable400 > tr:nth-child(2) > td:nth-child(3)";

function getURL(year,counter){
  var base_url = "http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx";
  var request = null;
  if(counter != 1){
    request = base_url+"?CodCuadro=400&Idioma=1&FecInicial="+year+"/01/01&FecFinal="+(year+1)+"/01/01&Filtro="+counter;
  }else{
    request = base_url+"?CodCuadro=400&Idioma=1&FecInicial="+year+"/01/01&FecFinal="+year+"/01/01&Filtro="+counter;
  }
  return request;
}

function getDate(date){
  console.log(date);
  var parts = date.split(' ');
  return Date.parse(parts[2]+'-'+getMonth(parts[1])+'-'+parts[0]);
}

function getMonth(mon){
  //Stupid month naming
  var months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];
  var value = null;
  if(undefined !== mon){
    value = months.indexOf(mon.toLowerCase())+1;
  }
  return value;
}

function saveCurrency(body){
  var $ = cheerio.load(body);

  var currency = {
    buy: $(buy_locator).text().trim().replace(/,/g , "."),
    sell: $(sell_locator).text().trim().replace(/,/g , "."),
    created_at: getDate($(date_locator).text().trim()),
  };
  if(currency.created_at !== null&&currency.buy&&currency.sell){
    db.model('Currency').create(currency,function(err){
      if (err){
        console.log(currency);
        throw err;
      }
    });
  }else{
    console.log(currency);
  }
}

function callback(err, response, body){
  if(err && response.statusCode !== 200){
    console.log('Request error.');
  }
  saveCurrency(body);
}
var year = 2016;
var end = 12;
for(var i = 366; i>0;i--){
  config.webservice.url = getURL(year,i);
  request.get(config.webservice,callback);
}

