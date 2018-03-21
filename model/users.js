var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  active: { type: Number ,required: true},
  last_login:Date,
  assets: {
    materials:{},
    loans:{},
    cdps:{},
    stocks:{},
    real_state:{},
  },
  created_at: Date,
  updated_at: Date,
  finish_at: Date,
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  if (!this.active) {
    this.active = true;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);