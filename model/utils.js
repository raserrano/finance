const
  wait = require('wait.for'),
  conf = require('../config/current'),
  db = require('./db');

module.exports = {
  upsertMarket: function(query,doc,callback) {
    db.model('Market').update(
      query,doc,{upsert: true,new: true},
      function(err,data) {callback(err,data);}
    );
  },
  getMarkets: function(callback) {
    db.model('Market').find({}).exec(
      function(err,data) {
        callback(err,data);
      }
    );
  },
  getCryptos: function(callback) {
    db.model('Crypto').find({}).exec(
      function(err,data) {
        callback(err,data);
      }
    );
  },
  upsertCurrency: function(doc,callback) {
    db.model('Currency').update(
      {created_at: doc.created_at},doc,{upsert: true,new: true},
      function(err,data) {callback(err,data);}
    );
  },
  getMonth: function(mon) {
    // Stupid month naming
    var months = [
      'ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic',
    ];
    var value = null;
    if (undefined !== mon) {
      value = months.indexOf(mon.toLowerCase()) + 1;
    }
    return value;
  },
  getDate: function(date) {
    var from = null;
    if(date != null && date != ''){
      var parts = date.split(' ');
      from = Date.parse(
        parts[2] + '-' + this.getMonth(parts[1]) + '-' + parts[0]
      );
    }
    return from;
  },
}