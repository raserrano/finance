const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cryptoSchema = new Schema({
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  buy_at: Date,
  sell_at: Date
})

cryptoSchema.pre('save', function (next) {
  const currentDate = new Date()
  this.updated_at = currentDate
  if (!this.created_at) {
    this.created_at = currentDate
  }
  if (!this.active) {
    this.active = true
  }
  next()
  console.log('Crypto created!')
})

module.exports = mongoose.model('Crypto', cryptoSchema)
