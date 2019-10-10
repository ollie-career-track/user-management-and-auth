const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  chapters: {
    type: Number,
    default: 1
  },
  ongoing: {
    type: Boolean,
    default: true
  },
  genre: [{
    type: String
  }]
});

module.exports = mongoose.model('Comic', schema);