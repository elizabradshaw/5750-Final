const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const mustacheStyleSchema = new Schema({
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
        //return /\.(jpg|png)$/i.test(v);
        return /^images\/\d+-[\w-]+\.(jpg|jpeg|png)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`,
    },
  },
  description: {
    type: String,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true
  },
});

mustacheStyleSchema.path('title').set(function (value) {
  this.slug = slugify(value, { lower: true, trim: true });
  this.titleSlug = this.slug;
  return value;
});


module.exports = mongoose.model('MustacheStyle', mustacheStyleSchema);
