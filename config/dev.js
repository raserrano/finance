module.exports = {
  database: {
    options: {
      db: { native_parser: true },
      server: { poolSize: 5 },
      replset: { rs_name: 'myReplicaSetName' },
      auth: false,
      user: 'mondo',
      pass: 'mongo',
      host: '127.0.0.1',
      port: '27017',
      database: 'money'
    },
    conn: function (database) {
      let uri = ''
      if ((process.env.MONGODB_URI !== undefined) &&
        (process.env.MONGODB_URI !== null)) {
        uri = process.env.MONGODB_URI
      } else {
        if (!database.auth) {
          uri = 'mongodb://' + database.host + ':' +
            database.port + '/' + database.database
        } else {
          uri = 'mongodb://' + database.username + ':' +
            database.password + '@' + database.host + ':' +
            database.port + '/' + database.database
        }
      }
      return uri.toString()
    }
  },
  webservice: {
    url: 'http://www.bccr.fi.cr/Indicadores/IndicadoresJSON.ashx',
    port: 80,
    method: 'GET',
    agent: false,
    followAllRedirects: true
  },
  metals: {
    gold: 'http://www.indexmundi.com/commodities/?commodity=gold',
    silver: 'http://www.indexmundi.com/commodities/?commodity=silver',
    aluminum: 'http://www.indexmundi.com/commodities/?commodity=aluminum',
    copper: 'http://www.indexmundi.com/commodities/?commodity=copper',
    diesel: 'http://www.indexmundi.com/commodities/?commodity=diesel',
    gasoline: 'http://www.indexmundi.com/commodities/?commodity=gasoline'
  },
  crypto: {
    url: 'https://bittrex.com/api/v1.1/public/getmarketsummaries'
  },
  env: {
    DEBUG: function () {
      let value = false
      if ((process.env.DEBUG !== undefined) &&
        (process.env.DEBUG !== null)) {
        value = JSON.parse(process.env.DEBUG)
      }
      return value
    },
    ACCOUNT_NAME: function () {
      let value = ''
      if ((process.env.ACCOUNT_NAME !== undefined) &&
        (process.env.ACCOUNT_NAME !== null)) {
        value = process.env.ACCOUNT_NAME
      }
      return value
    },
    POSTING_KEY_PRV: function () {
      let value = ''
      if ((process.env.POSTING_KEY_PRV !== undefined) &&
        (process.env.POSTING_KEY_PRV !== null)) {
        value = process.env.POSTING_KEY_PRV
      }
      return value
    },
    YEAR: function () {
      let value = new Date().getFullYear()
      if ((process.env.YEAR !== undefined) &&
        (process.env.YEAR !== null)) {
        value = parseInt(process.env.YEAR)
      }
      return value
    }
  }
}
