import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './styles/Category.css';

const Category = ({ details }) => {
  const [tweets, setTweets] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const categoryName = details.match.params.cName;
  useEffect(() => {
    //getting tweets
    axios.get(`/api/t/tweets${details.location.search}`).then((res) => {
      setTweets(res.data);
    }, []);

    //getting all th eblog posts of a particular category
    axios
      .get(`/api/b/blogs/category/${categoryName}`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className='Category-heading'>{categoryName}</h1>
      <div>
        {tweets.map((t, idx) => {
          return (
            <div className='Category-tweet' key={idx}>
              <h3>{t}</h3>
              <Link
                to={`/blog/tweet/${categoryName}?q=${categoryName.toLowerCase()}`}
              >
                Create Blog
              </Link>
              <Link to='/'>Home</Link>
            </div>
          );
        })}
      </div>
      <div>
        {blogs.map((b) => {
          return (
            <div className='Category-blog' key={b._id}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
              <Link to={`/blog/${b._id}`}>Read More</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
