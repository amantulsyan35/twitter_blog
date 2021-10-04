const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Blog = require('../models/blog');

//retreiving all the blog posts
router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});

//retreiving blog post by categories
router.get('/blogs/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const blogs = await Blog.find({ category: categoryName });
  res.send(blogs);
});
//getting individual blog
router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.send(blog);
});

// creating a new blog post
router.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.send('It worked!!!');
});

//updating blog
router.put('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
});

router.delete(`/blogs/:id`, async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
});

module.exports = router;
