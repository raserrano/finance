const axios = require('axios')
const utils = require('../model/utils')
const config = require('../config/current')

async function main () {
  const economy = await axios.get(config.webservice)
  console.log(economy.body)
  const data = JSON.parse(economy.body)
  const currency = {
    buy: data.TipoCambioCompra.replace(/,/g, '.'),
    sell: data.TipoCambioVenta.replace(/,/g, '.'),
    created_at: new Date()
  }
  await utils.upsertCurrency(currency)
  console.log('Finish updating currency')
  process.exit()
}
main()
