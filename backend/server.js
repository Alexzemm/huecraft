const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, '../users.txt');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    const lines = data.split('\n');
    const userLine = lines.find(line => line.split(':')[0] === username);
    if (!userLine) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const [user, hash] = userLine.split(':');
    if (hashPassword(password) === hash) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
