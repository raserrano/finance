var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  status: { type: Number ,required: true},
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
  if (!this.status) {
    // Status codes to de defined 2 temp to be register not confirmed
    this.status = 2;
  }
  next();
  console.log('User created!');
});

module.exports = mongoose.model('User', userSchema);