// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = []; // In-memory user store (replace with DB in production)
const SECRET = 'your_jwt_secret';

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ fullName, email, password: hashedPassword });
  res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(3001, () => console.log('Backend running on http://10.22.160.39:3001'));