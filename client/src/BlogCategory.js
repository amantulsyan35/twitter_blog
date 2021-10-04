//third party
import React from 'react';

import { Link } from 'react-router-dom';

import './styles/BlogCategory.css';

const Home = () => {
  const categories = ['crypto', 'programming', 'thinkers'];

  return (
    <div>
      <h1>Choose From Categories</h1>
      <div className='Home'>
        <Link to='/'>Home</Link>
      </div>
      <div className='Blog-category-container'>
        {categories.map((c, idx) => {
          return (
            <Link
              to={`/blog/category/${c}?q=${c.toLowerCase()}`}
              className='Blog-category'
              key={idx}
            >
              {c}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
