const slugify = require('slugify');

const BlogPostMongoose = require('../models/BlogPostMongoose');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogPostMongoose.find().sort({ postDate: 'desc' });
    res.render('blog', { pageTitle: 'Blog', blogs, path: req.baseUrl });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const { titleSlug } = req.params;
  try {
    const blog = await BlogPostMongoose.findOne({ titleSlug });
    res.render('blog-single-post', {
      pageTitle: blog.title,
      blog,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.createBlogPost = async (req, res) => {
  const image = req.file;
  const { title, summary, content } = req.body;
  const imageURL = "images/" + image.filename;
  const titleSlug = slugify(title, { lower: true, trim: true });
  const newBlogPost = new BlogPostMongoose({ title, summary, content, imageURL, titleSlug });
  await newBlogPost.save();
  res.redirect('/blog');
};

exports.renderNewBlogPost = (req, res) => {
  res.render('new-blog-post', { pageTitle: 'Create New Blog Post' });
};


exports.upload = upload;