const conf = require('../config/current')
const Metal = require('./metals')
const Market = require('./markets')
const Crypto = require('./cryptos')
const Currency = require('./currencies')

module.exports = {
  upsertMarket: async function (query, doc, callback) {
    await Market.updateOne(
      query, doc, { upsert: true, new: true }
    )
  },
  getMarkets: function (callback) {
    Market.find({}).exec(
      function (err, data) {
        callback(err, data)
      }
    )
  },
  getCryptos: function (callback) {
    Crypto.find({}).exec(
      function (err, data) {
        callback(err, data)
      }
    )
  },
  upsertCurrency: function (doc, callback) {
    return Currency.updateOne(
      { created_at: doc.created_at }, doc, { upsert: true, new: true }
    )
  },
  getMonth: function (mon) {
    // Stupid month naming
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'
    ]
    // console.log(mon)
    let value = null
    if (undefined !== mon) {
      value = months.indexOf(mon.toLowerCase()) + 1
    }
    return value
  },
  getDate: function (date) {
    // console.log(`Date is ${date}`)
    let from = null
    if (date != null && date != '') {
      const parts = date.split(' ')
      // console.log(parts)
      from = Date.parse(
        parts[2] + '-' + this.getMonth(parts[1]) + '-' + parts[0]
      )
    }
    return from
  }
}
