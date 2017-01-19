var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var interestSchema = new Schema({
  period: { type: Number, required: true},
  rate: { type: Number, required: true},
  created_at: Date,
  updated_at: Date
});

interestSchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
  console.log('Interest created!');
});

var Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;