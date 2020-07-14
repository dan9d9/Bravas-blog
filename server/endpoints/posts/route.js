const express = require('express');
const router = express.Router();
const Post = require('./model');

/* GET posts */
router.get('/allposts', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* Create new post */
router.post('/create', async (req, res, next) => {
  const { author, title, body } = req.body;
  if (!title || !author || !body) return res.status(400).json({ message: 'Missing parameter' });

  const newPost = new Post({
    author,
    title,
    body,
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
