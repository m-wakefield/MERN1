const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://monique:Bear12@cluster0.vzig1ox.mongodb.net/mern1?retryWrites=true&w=majority');

const User = require('./models/User');
const Question = require('./models/Question');

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
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

// Optional: Just a friendly root check
app.get('/', (req, res) => {
  res.send('MERN1 API is running.');
});

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
