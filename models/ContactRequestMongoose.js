const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  dateResponded: {
    type: Date,
  },
  response: {
    type: String,
  },
});

contactRequestSchema.virtual('shortMessage').get(function() {
  return `${this.message.split(/\s+/).slice(0, 10).join(' ')}...`;
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
