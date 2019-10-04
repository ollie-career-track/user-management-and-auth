const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  limbs: {
    type: Number,
    default: 4
  },
  hasTail: {
    type: Boolean,
    default: false
  },
  traits: {
    isFurry: Boolean,
    canFly: Boolean,
    breathsWater: Boolean
  },
  diet: [{
    type: String,
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Animal', schema);