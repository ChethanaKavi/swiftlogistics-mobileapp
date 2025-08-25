// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Auth routes using Firebase
app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => res.send('MobileApp backend is running.'));

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));