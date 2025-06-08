const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://monique:Test123d@cluster0.vzig1ox.mongodb.net/mern1?retryWrites=true&w=majority');



const User = require('./models/User');
const Question = require('./models/Question');

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'Username already exists' });no
  const user = new User({ username, password });
  await user.save();
  res.json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: 'Invalid login' });
  res.json({ message: 'Login successful', username });
});

app.get('/questions/:category', async (req, res) => {
  const questions = await Question.find({ category: req.params.category }).sort({ createdAt: -1 });
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  const { category, question, answer } = req.body;
  const newQ = new Question({ category, question, answer });
  await newQ.save();
  res.json({ message: 'Question posted' });
});

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
