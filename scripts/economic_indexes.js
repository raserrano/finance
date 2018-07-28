var request = require('request'),
  wait = require('wait.for'),
  utils = require('../model/utils')
config = require('../config/current');

wait.launchFiber(function() {
  var economy = wait.for(request,config.webservice);
  console.log(economy.body);
  var data = JSON.parse(economy.body);
  var currency = {
    buy: data.TipoCambioCompra.replace(/,/g , '.'),
    sell: data.TipoCambioVenta.replace(/,/g , '.'),
    created_at: new Date(),
  };
  var res = wait.for(utils.upsertCurrency,currency)
  console.log('Finish updating currency');
  process.exit();
});