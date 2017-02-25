var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var interestSchema = new Schema({
  period: { type: Number, required: true},
  rate: { type: Number, required: true},
  active: { type: Boolean ,required: true},
  created_at: Date,
  updated_at: Date,
});

interestSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  if (!this.active) {
    this.active = true;
  }
  next();
  console.log('Interest created!');
});

module.exports = mongoose.model('Interest', interestSchema);