const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: function (v) {
      this.slug = slugify(v, { lower: true, trim: true });
      return v;
    },
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^images\/.*\.(jpg|jpeg|png)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`,
    },
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  titleSlug: {
    type: String,
    required: true
  },
});

blogPostSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
