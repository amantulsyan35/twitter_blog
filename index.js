const express = require('express');
const app = express();
require('dotenv').config();
let cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const Twitter = require('twitter');
const { urlencoded } = require('express');

//Database models
const Blog = require('./models/blog');

//routes
const blogRoutes = require('./routes/blogs');
const categoryRoutes = require('./routes/category');
const tweetRoutes = require('./routes/tweet');

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/b', blogRoutes);
app.use('/api/c', categoryRoutes);
app.use('/api/t', tweetRoutes);

app.listen(8080, () => {
  console.log('server is running');
});
