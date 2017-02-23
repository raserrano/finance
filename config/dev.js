module.exports = {
  database:{
    options:{
      db: { native_parser: true },
      server: { poolSize: 5 },
      replset: { rs_name: 'myReplicaSetName' },
      auth: false,
      user: 'mondo',
      pass: 'mongo',
      host: '127.0.0.1',
      port: '27017',
      database: 'money',
    },
    conn: function(database){
      var uri = '';
      if(!database.auth){
        uri = 'mongodb://' + database.host + ':' + database.port + '/' +database.database;
      }else{
        uri = 'mongodb://' + database.username + ':' + database.password + '@' + database.host + ':' + database.port + '/' +database.database;
      }
      return uri.toString();
    },
  },
  webservice:{
    url:'http://www.bccr.fi.cr/Indicadores/IndicadoresJSON.ashx',
    port:80,
    method:'GET',
    agent:false,
    followAllRedirects:true
  },
  metals:{
    gold:'http://www.indexmundi.com/commodities/?commodity=gold',
    silver:'http://www.indexmundi.com/commodities/?commodity=silver',
    aluminum:'http://www.indexmundi.com/commodities/?commodity=aluminum',
    copper:'http://www.indexmundi.com/commodities/?commodity=copper',
  }
};