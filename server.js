const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('/home/sfm/Desktop/New Folder 1/first-project'));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'sfm2002', // replace with your MySQL password
    database: 'LMS' // replace with your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Insert data into the database
app.post('/addbook', (req, res) => {
    const user = { STM: req.body.stm, B_ID: req.body.id, B_NAME: req.body.name, SEM: req.body.sem};
    const sql = 'INSERT INTO books SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('Book added...');
    });
});

// Fetch data from the database
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
app.listen(2001, async() => {
    // Use dynamic import for the 'open' module
    const open = await import('open');
    await open.default('http://localhost:2001'); // 'open' is now an ES module, so use open.default
    console.log('Server started on port 2001');
});
