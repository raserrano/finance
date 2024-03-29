const mongoose = require('mongoose')

const Schema = mongoose.Schema

const currencySchema = new Schema({
  buy: { type: Number, required: true },
  sell: { type: Number, required: true },
  created_at: {
    type: Date,
    index: { unique: true, dropDups: true },
    required: true
  },
  updated_at: Date
})

currencySchema.pre('save', function (next) {
  const currentDate = new Date()
  this.updated_at = currentDate
  if (!this.created_at) {
    this.created_at = currentDate
  }
  next()
  console.log('Currency created!')
})

module.exports = mongoose.model('Currency', currencySchema)
