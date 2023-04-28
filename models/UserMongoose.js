const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false
  },
  favoriteStyles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MustacheStyle'
    }
  ]
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('UserMongoose', userSchema, 'users');
