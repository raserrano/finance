const request = require('request')
const wait = require('wait.for')
const config = require('../config/current')
const utils = require('../model/utils')
const db = require('../model/db')

wait.launchFiber(function () {
  const markets = wait.for(
    request,
    config.crypto.url
  )
  const cryptos = JSON.parse(markets.body).result
  for (let i = 0; i < cryptos.length; i++) {
    const query = { name: cryptos[i].MarketName }
    const doc = {
      name: cryptos[i].MarketName,
      low: cryptos[i].Low,
      high: cryptos[i].High,
      vol: cryptos[i].Volume,
      last: cryptos[i].Last,
      updated: new Date()
    }
    wait.for(utils.upsertMarket, query, doc)
  }
  console.log('Finish updating crypto markets')
  process.exit()
})
