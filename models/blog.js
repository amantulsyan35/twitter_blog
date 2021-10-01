const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['crypto', 'programming', 'thinkers'],
  },
  imageURL: {
    type: String,
    required: true,
  },
  tweet: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
