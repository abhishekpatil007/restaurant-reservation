const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '13.127.42.139',
    user: 'root',
    password: 'admin',
    database: 'your_database_name',
    port: 3306 // Ensure this matches the actual MySQL port
    
  });
  

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:');
        console.error(err);
        throw err;
    }
    console.log('Connected to MySQL database.');
});

// API to get reservations
app.get('/api/reservations', (req, res) => {
    console.log('Fetching reservations');
    db.query('SELECT * FROM reservations', (err, results) => {
        if (err) return res.status(500).send(err);
        
        // Set the content type to HTML
        res.setHeader('Content-Type', 'text/html');

        // Format results as a styled HTML table
        let htmlTable = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
        </style>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Table Number</th>
                <th>Phone</th>
                <th>Guests</th>
                <th>Location</th>
                <th>Member</th>
                <th>Created At</th>
            </tr>`;
        
        results.forEach(row => {
            htmlTable += `<tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.table_number}</td>
                <td>${row.phone}</td>
                <td>${row.guests}</td>
                <td>${row.location}</td>
                <td>${row.member}</td>
                <td>${row.created_at}</td>
            </tr>`;
        });
        htmlTable += '</table>';
        
        res.send(htmlTable); // Send the styled HTML table as the response
    });
});

// API to add a reservation
app.post('/api/reservations', (req, res) => {
    const { name, table, phone, guests, location, member } = req.body;
    const reservation = { name, table_number: table, phone, guests, location, member: parseInt(member) };
    db.query('INSERT INTO reservations SET ?', reservation, (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Reservation added.');
    });
});

app.listen(port, 'localhost', () => {
    console.log(`Server running on http://localhost:${port}`);
});
