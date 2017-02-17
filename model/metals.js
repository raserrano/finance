var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var metalSchema = new Schema({
  price: { type: Number, required: true},
  type: { type: String, required: true},
  value: Number,
  created_at: Date,
});

metalSchema.pre('save', function(next) {
  var currentDate = new Date();  
  if (!this.created_at)
    this.created_at = currentDate;
  next();
  console.log('Metal created!');
});

var Metal = mongoose.model('Metal', metalSchema);

module.exports = Metal;