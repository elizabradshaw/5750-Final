const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { upload } = require("../controllers/blogController");

router.get("/", blogController.getBlogs);

router.get('/new', blogController.renderNewBlogPost);

router.post('/create', upload.single('image'), blogController.createBlogPost);

router.get("/:titleSlug", blogController.getSingleBlog);

module.exports = router;
