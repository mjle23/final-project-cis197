var mongoose = require('mongoose')

const shoutoutSchema = new mongoose.Schema({
  shoutoutText: { type: String },
})

module.exports = mongoose.model('Shoutout', shoutoutSchema);
