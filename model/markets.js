const mongoose = require('mongoose')

const Schema = mongoose.Schema

const marketSchema = new Schema({
  low: { type: Number, required: true },
  high: { type: Number, required: true },
  vol: { type: Number, required: true },
  last: { type: Number, required: true },
  name: { type: String, required: true },
  updated: Date
})

marketSchema.pre('save', function (next) {
  const currentDate = new Date()
  this.updated_at = currentDate
  if (!this.created_at) {
    this.created_at = currentDate
  }
  if (!this.active) {
    this.active = true
  }
  next()
})

module.exports = mongoose.model('Market', marketSchema)
