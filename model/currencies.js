var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var currencySchema = new Schema({
  buy: { type: Number, required: true},
  sell: { type: Number, required: true},
  created_at: Date,
  updated_at: Date
});

currencySchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
  console.log('Currency created!');
});

var Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;