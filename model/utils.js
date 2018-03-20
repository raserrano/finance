const
  wait = require('wait.for'),
  conf = require('../config/current'),
  db = require('./db');

module.exports = {   
   upsertMarket: function(query,doc,callback){
    db.model('Market').update(
      query,doc,{upsert: true,new: true},
      function(err,data) {callback(err,data);}
    );
  },
  getMarkets: function(callback){
    db.model('Market').find().exec(
      function(err,data){
        callback(err,data);
      }
    );
  },
}