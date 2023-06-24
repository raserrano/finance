const axios = require('axios')
const config = require('../config/current')
const utils = require('../model/utils')
// const db = require('../model/db')

async function main () {
  const markets = await axios.get(config.crypto.url)
  const cryptos = []
  cryptos.push(markets.data.find(e => e.symbol.includes('BTC-USD')))
  cryptos.push(markets.data.find(e => e.symbol.includes('LTC-USD')))
  cryptos.push(markets.data.find(e => e.symbol.includes('DOGE-USD')))
  console.log(cryptos)
  for (let i = 0; i < cryptos.length; i++) {
    const query = { symbol: cryptos[i].symbol }
    await utils.upsertMarket(query, cryptos[i])
    // console.log(doc)
  }
  console.log('Finish updating crypto markets')
  process.exit()
}
main()
