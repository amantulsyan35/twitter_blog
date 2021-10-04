import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './styles/EditBlog.css';

const EditBlog = ({ details }) => {
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

    //getting the individual blog
    axios
      .get(`/api/b/blogs/${details.match.params.id}`)
      .then((res) => {
        setTweet(res.data.tweet);
        setTitle(res.data.title);
        setCategory(res.data.category);
        setText(res.data.text);
        setImageURL(res.data.imageURL);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .put(`/api/b/blogs/${details.match.params.id}`, {
        title,
        imageURL,
        category,
        text,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    history.push('/');
  };
  return (
    <div>
      <h1>Edit Blog</h1>
      <div className='Form-container'>
        <div className='Form-tweet'>
          <p>{tweet}</p>
        </div>
        <form onSubmit={handleSubmit} action='/api/blogs' method='POST'>
          <div className='Form-input'>
            <label>Enter Title</label>
            <input
              value={title}
              type='text'
              onChange={(evt) => setTitle(evt.target.value)}
            />
          </div>
          <div className='Form-input'>
            <label>Enter Image URL</label>
            <input
              type='text'
              value={imageURL}
              onChange={(evt) => setImageURL(evt.target.value)}
            />
          </div>
          <div className='Form-input'>
            <label>Select Category</label>
            <select
              value={category}
              onChange={(evt) => setCategory(evt.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className='Form-input'>
            <label>Blog</label>
            <textarea
              value={text}
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
export default EditBlog;
