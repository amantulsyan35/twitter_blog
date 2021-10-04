import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles/Blog.css';

const Blog = ({ details }) => {
  const [blog, setBlog] = useState({});
  const blogId = details.match.params.id;
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/b/blogs/${blogId}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (evt) => {
    axios
      .delete(`/api/b/blogs/${blogId}`)
      .then((res) => console.log('deleted'))
      .catch((err) => console.log(err));
    history.push('/');
  };

  return (
    <div className='Blog'>
      <div className='Blog-container'>
        <div className='Blog-tweet'>
          <h5>{blog.tweet}</h5>
        </div>
        <h1>{blog.title}</h1>
        <span>
          <b>{blog.category}</b>
        </span>
        <br />
        <span>
          <b>{blog.createdAt}</b>
        </span>
        <div className='Blog-img'>
          <img alt={blog.title} src={blog.imageURL} />
        </div>
        <div>
          <p>{blog.text}</p>
        </div>
        <div className='Blog-link'>
          <Link
            className='Blog-change'
            to={`/blog/edit/${blog.category}/${blogId}`}
          >
            Edit
          </Link>
          <button onClick={handleDelete} className='Blog-change-delete'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
