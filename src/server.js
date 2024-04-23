const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name'
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
  } else {
    console.log('Verbindung zur MySQL-Datenbank hergestellt.');
  }
});

module.exports = connection;


const express = require('express');
const connection = require('./db');
const app = express();

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('Express-Server läuft auf Port 3000');
});
