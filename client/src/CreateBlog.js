import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import './styles/CreateBlog.css';

const CreateBlog = ({ details }) => {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState(details.match.params.cName);
  const [text, setText] = useState('');
  const [categories, setCategories] = useState([]);
  const [tweet, setTweet] = useState('');
  let history = useHistory();

  useEffect(() => {
    //getting categories
    axios
      .get('/api/c/categories')
      .then((res) => setCategories(Object.keys(res.data)))
      .catch((err) => console.log(err));

    // getting the current tweet
    axios.get(`/api/t/tweets${details.location.search}`).then((res) => {
      setTweet(res.data[0]);
    });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post('/api/b/blogs', { tweet, title, imageURL, category, text })
      .then((res) => console.log(res));
    history.push('/');
  };
  // console.log(details);

  return (
    <div>
      <h1>Create A New Blog</h1>
      <div className='Form-container'>
        <div className='Form-tweet'>
          <p>{tweet}</p>
        </div>
        <form onSubmit={handleSubmit} action='/api/blogs' method='POST'>
          <div className='Form-input'>
            <label>Enter Title</label>
            <input type='text' onChange={(evt) => setTitle(evt.target.value)} />
          </div>
          <div className='Form-input'>
            <label>Enter Image URL</label>
            <input
              type='text'
              onChange={(evt) => setImageURL(evt.target.value)}
            />
          </div>
          <div className='Form-input'>
            <label>Select Category</label>
            <select value={category} readOnly>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className='Form-input'>
            <label>Blog</label>
            <textarea
              col='25'
              rows='25'
              onChange={(evt) => setText(evt.target.value)}
            />
          </div>
          <input className='Form-submit' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
