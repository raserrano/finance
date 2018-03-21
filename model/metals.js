var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metalSchema = new Schema({
  price: { type: String, required: true},
  type: { type: String, required: true},
  metal: String,
  value: Number,
  created_at: Date,
});

metalSchema.pre('save', function(next) {
  var currentDate = new Date();
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model('Metal', metalSchema);
