const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); 
const app = express();
const port = 5000; 

app.use(cors()); 
app.use(express.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'your_database_name' 
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  db.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length > 0) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
