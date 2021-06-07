const axios = require('axios')
const config = require('../config/current')
const utils = require('../model/utils')
//const db = require('../model/db')

async function main() {
  const markets = await axios.get(config.crypto.url)
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
    // await utils.upsertMarket(query, doc)
    console.log(doc)
  }
  console.log('Finish updating crypto markets')
}
main()