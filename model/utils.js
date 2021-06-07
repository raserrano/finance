const
  wait = require('wait.for')
const conf = require('../config/current')
const Metal = require('./metals')
const Market = require('./markets')
const Crypto = require('./cryptos')
const Currency = require('./currencies')
const db = require('./db')

module.exports = {
  upsertMarket: function (query, doc, callback) {
    Market.update(
      query, doc, { upsert: true, new: true },
      function (err, data) { callback(err, data) }
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
    Currency.update(
      { created_at: doc.created_at }, doc, { upsert: true, new: true },
      function (err, data) { callback(err, data) }
    )
  },
  getMonth: function (mon) {
    // Stupid month naming
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'
    ]
    let value = null
    if (undefined !== mon) {
      value = months.indexOf(mon.toLowerCase()) + 1
    }
    return value
  },
  getDate: function (date) {
    let from = null
    if (date != null && date != '') {
      const parts = date.split(' ')
      from = Date.parse(
        parts[2] + '-' + this.getMonth(parts[1]) + '-' + parts[0]
      )
    }
    return from
  }
}
