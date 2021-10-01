const mongoose = require('mongoose');

//Database models
const Blog = require('./models/blog');

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

Blog.create({
  title: 'Think before you act!',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
  category: 'thinkers',
  imageURL:
    'https://drjohnsullivan.com/wp-content/uploads/2017/07/strategic-thinking.jpg',
  tweet: 'This is a smaple tweet',
})
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
