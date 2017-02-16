var config = {
  database:{
    options:{
      db: { native_parser: true },
      server: { poolSize: 5 },
      replset: { rs_name: 'myReplicaSetName' },
      user: 'mondo',
      pass: 'mongo',
      host: '127.0.0.1',
      port: '27017',
      database: 'money',

    },
    uri_dev: 'mongodb://localhost/money',
    uri: 'mongodb://${host}:${port}/${database}',
    uri2: 'mongodb://${username}:${password}@${host}:${port}/${database}',
  },
  webservice:{
    url:"http://www.bccr.fi.cr/Indicadores/IndicadoresJSON.ashx",
    port:80,
    method:'GET',
    agent:false,
    followAllRedirects:true
  }
}

module.exports = config;