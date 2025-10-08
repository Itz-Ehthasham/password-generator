const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.mongoURI || 'mongodb://localhost:27017/passwordgen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Password Schema
const passwordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', passwordSchema);

// Routes
app.post('/api/passwords', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const newPassword = new Password({ userId, password });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/passwords/:userId', async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/passwords/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Password Generator API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});