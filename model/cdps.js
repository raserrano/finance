var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(config.database.uri_dev);

var cdpSchema = new Schema({
  amount: { type: Number, required: true},
  days: { type: Number, required: true},
  interest: { type: Number, required: true},
  active: { type:Boolean ,required:true},
  created_at: Date,
  updated_at: Date,
  finish_at: Date
});

cdpSchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
  console.log('CDP created!');
});

var Cdp = mongoose.model('Cdp', cdpSchema);

module.exports = Cdp;