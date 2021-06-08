const mongoose = require('mongoose')

const Schema = mongoose.Schema

const metalSchema = new Schema({
  price: { type: String, required: true },
  type: { type: String, required: true },
  metal: String,
  value: Number,
  created_at: Date
})

metalSchema.pre('save', function (next) {
  const currentDate = new Date()
  if (!this.created_at) {
    this.created_at = currentDate
  }
  next()
})

module.exports = mongoose.model('Metal', metalSchema)
