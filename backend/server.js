const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'your_database_name',
    port: 3306 // Ensure this matches the actual MySQL port
  });
  

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// API to get reservations
app.get('/api/reservations', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API to add a reservation
app.post('/api/reservations', (req, res) => {
    const { name, table, phone, guests, location, member } = req.body;
    const reservation = { name, table_number: table, phone, guests, location, member };
    db.query('INSERT INTO reservations SET ?', reservation, (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Reservation added.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
