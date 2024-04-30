const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
  } else {
    console.log('Verbindung zur MySQL-Datenbank hergestellt.');

    // Führen Sie eine SQL-Abfrage aus, sobald die Verbindung hergestellt ist
    connection.query('SELECT * FROM test', (err, results) => {
      if (err) {
        console.error('Fehler bei der SQL-Abfrage:', err);
      } else {
        console.log(results);
      }
    });
  }
});

module.exports = connection;

const express = require('express');
/* const connection = require('./db'); */
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