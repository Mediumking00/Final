const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('Transaction', transactionSchema)