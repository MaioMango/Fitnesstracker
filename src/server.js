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
const bodyParser = require('body-parser'); 

const app = express();

app.use(body-parser.json());

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


const bcrypt = require('bcrypt');
const saltRounds = 10; 

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server-Fehler' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Hashen des Passworts' });
      }

      connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Fehler bei der Registrierung' });
        }

        res.status(201).json({ message: 'Registrierung erfolgreich' });
      });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server-Fehler' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Benutzer nicht gefunden' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Vergleich des Passworts' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });
      }

      res.status(200).json({ message: 'Login erfolgreich' });
    });
  });
});



app.listen(3000, () => {
  console.log('Express-Server läuft auf Port 3000');
});