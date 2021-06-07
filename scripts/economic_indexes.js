const request = require('request')
const utils = require('../model/utils')
config = require('../config/current')

wait.launchFiber(function () {
  const economy = wait.for(request, config.webservice)
  console.log(economy.body)
  const data = JSON.parse(economy.body)
  const currency = {
    buy: data.TipoCambioCompra.replace(/,/g, '.'),
    sell: data.TipoCambioVenta.replace(/,/g, '.'),
    created_at: new Date()
  }
  const res = wait.for(utils.upsertCurrency, currency)
  console.log('Finish updating currency')
  process.exit()
})
