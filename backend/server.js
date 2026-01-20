const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


require('dotenv').config({ path: path.join(__dirname, '../.env') });

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: 'Missing password' });
  }
  const envPassword = process.env.PASSWORD;
  if (!envPassword) {
    return res.status(500).json({ success: false, message: 'Server misconfigured' });
  }
  if (password === envPassword) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
