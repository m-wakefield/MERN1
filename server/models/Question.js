const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
