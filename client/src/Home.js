import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  axios.defaults.baseURL = 'http://localhost:8080';
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('/api/b/blogs')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className='Home-heading'>Home</h1>
      <div className='Home-create'>
        <Link to='/blog/category'>Create Blog</Link>
      </div>
      <div>
        {blogs.map((b) => {
          return (
            <div className='Home-blog' key={b._id}>
              <h3>{b.title}</h3>
              <span>
                <b>{b.category}</b>
              </span>
              <p>{b.text}</p>
              <Link to={`/blog/${b._id}`}>Read More</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
