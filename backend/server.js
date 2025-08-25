// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Orders routes (mount before express.json to allow multer to parse file uploads)
app.use('/api/orders', require('./routes/orders'));
// Auth routes using Firebase
app.use(express.json());
app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => res.send('MobileApp backend is running.'));

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));