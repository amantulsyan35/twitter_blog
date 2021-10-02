const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const Twitter = require('twitter');
const { urlencoded } = require('express');

//Database models
const Blog = require('./models/blog');

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(express.json());

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

// twitter list ids accroding to categories
const categories = {
  crypto: '875371355570487296',
  programming: '1324307536300761088',
  thinkers: '1311718915249254401',
};

//getting tweets with respect to twitter list_ids
app.get('/api/t/tweets', async (req, res, next) => {
  try {
    const { q } = req.query;
    let params = {
      list_id: categories[q],
      count: 1,
      include_rts: false,
    };
    const tweetInfo = await client.get('lists/statuses.json', params);
    let arr = [];

    tweetInfo.forEach((t) => {
      arr.push(t.text);
    });
    res.send(arr);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

app.get('/api/c/categories', (req, res) => {
  res.send(categories);
});

//retreiving all the blog posts
app.get('/api/b/blogs', async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});

//retreiving blog post by categories
app.get('/api/b/blogs/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const blogs = await Blog.find({ category: categoryName });
  res.send(blogs);
});
//getting individual blog
app.get('/api/b/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.send(blog);
});

// creating a new blog post
app.post('/api/b/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.send('It worked!!!');
});

//updating blog
app.put('/api/b/blogs/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
});

app.delete(`/api/b/blogs/:id`, async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
});

app.listen(8080, () => {
  console.log('server is running');
});
