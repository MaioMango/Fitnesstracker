const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM tmember', (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler users');
    } else {
      res.json(results);
    }
  });
});


const bcrypt = require('bcrypt');
const saltRounds = 10; 

app.post('/register', (req, res) => {
  const { login, password } = req.body;
console.log(login);
  connection.query('SELECT * FROM tmember WHERE memLogin = ?', [login], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server-Fehler register' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Hashen des Passworts' });
      }

      connection.query('INSERT INTO tmember (memLogin, memPassword) VALUES (?, ?)', [login, hash], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Fehler bei der Registrierung' });
        }

        res.status(201).json({ message: 'Registrierung erfolgreich' });
      });
    });
  });
});


app.post('/login', (req, res) => {
  const { login, password } = req.body;

  connection.query('SELECT * FROM tmember WHERE memLogin = ?', [login], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server-Fehler login' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Benutzer nicht gefunden' });
    }

    const user = results[0];

    bcrypt.compare(password, user.memPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Vergleichen der Passwörter' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });
      }

      res.status(200).json({ message: 'Login erfolgreich' });
    });
  });
});


app.post('/food', (req, res) => {
  const { foodName, kcal, carbs, protein, fat, meal, quantity } = req.body;

  connection.query('INSERT INTO foods (foodName, kcal, carbs, protein, fat, meal, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                   [foodName, kcal, carbs, protein, fat, meal, quantity], 
                   (err, results) => {
    if (err) {
      console.error('Fehler beim Einfügen der Lebensmittelinformationen:', err);
      return res.status(500).json({ message: 'Fehler beim Speichern der Lebensmittelinformationen' });
    }
    res.status(201).json({ message: 'Lebensmittelinformationen erfolgreich gespeichert' });
  });
});

app.listen(3000, () => {
  console.log('Express-Server läuft auf Port 3000');
});