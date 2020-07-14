import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [form, setForm] = useState({
    author: '',
    title: '',
    body: '',
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('/posts/allposts');
        console.log(response.data);
        setPosts([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    };
    getPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await axios.post('/posts/create', {
        author: form.author,
        title: form.title,
        body: form.body,
      });

      console.log(response);
    } catch (err) {
      if (err.response) {
        console.log('error response: ', err.response);
      } else {
        console.log('error: ', err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="author" value={form.author} />
        <input onChange={handleChange} name="title" value={form.title} />
        <input onChange={handleChange} name="body" value={form.body} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {posts.map((ele) => (
          <p key={ele.title}>{ele.body}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
