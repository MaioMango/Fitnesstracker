const mysql = require('mysql2');
const path = require('path');
const jwt = require('jsonwebtoken');
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

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
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

      // Erstellen Sie ein JWT-Token
      const token = jwt.sign({ id: user.memKey, username: user.memLogin }, 'your-secret-key', { expiresIn: '1h' });
      console.log('Token:', token);
      res.status(200).json({ message: 'Login erfolgreich', token });
    });
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout erfolgreich' });
});


app.post('/weight', (req, res) => {
  const { userid, weight, date } = req.body;

  connection.query('INSERT INTO tweight (userkey, weight, date) VALUES (?, ?, ?)', [userid, weight, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server-Fehler weight' });
    }

    res.status(201).json({ message: 'Gewicht erfolgreich hinzugefügt' });
  });
});


app.post('/bmi', (req, res) => {
  const { userId, bmi, category, date } = req.body;

  connection.query('INSERT INTO tbmi (userKey, bmi, category, date) VALUES (?, ?, ?, ?)', [userId, bmi, category, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Fehler beim Speichern des BMI in der Datenbank' });
    }

    res.status(201).json({ message: 'BMI erfolgreich in der Datenbank gespeichert' });
  });
});


app.post('/calories', (req, res) => {
  const { userId, calories, date } = req.body;

  connection.query('INSERT INTO tcalories (userKey, calories, date) VALUES (?, ?, ?)', [userId, calories, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Fehler beim Speichern der Kalorien in der Datenbank' });
    }

    res.status(201).json({ message: 'Kalorien erfolgreich in der Datenbank gespeichert' });
  });
});


app.post('/food', (req, res) => {
  const { foodName, code, kcal, carbs, protein, fat } = req.body;

  connection.query('INSERT INTO tfood (fodName, fodCode, fodKcal, fodCarbs, fodProtein, fodFat) VALUES (?, ?, ?, ?, ?, ?)',
    [foodName, code, kcal, carbs, protein, fat],
    (err, results) => {
      if (err) {
        console.error('Fehler beim Einfügen der Lebensmittelinformationen:', err);
        return res.status(500).json({ message: 'Fehler beim Speichern der Lebensmittelinformationen' });
      }
      res.status(201).json({ message: 'Lebensmittelinformationen erfolgreich gespeichert' });
    });
});

app.post('/food2user', (req, res) => {
  const { code, meal, quantity, userId, date } = req.body;

  connection.query('INSERT INTO tfood2user (ftuCode, ftuMeal, ftuQuantity, ftuUser, ftuDate) VALUES (?, ?, ?, ?, ?)',
    [code, meal, quantity, userId, date],
    (err, results) => {
      if (err) {
        console.error('Fehler beim Einfügen der Lebensmittelinformationen:', err);
        return res.status(500).json({ message: 'Fehler beim Speichern der Lebensmittelinformationen' });
      }
      res.status(201).json({ message: 'Lebensmittelinformationen erfolgreich gespeichert' });
    });
});

app.get('/bmi/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tbmi WHERE userKey = ? ORDER BY date DESC LIMIT 1', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler BMI');
    } else {
      res.json(results);
    }
  });
});

app.get('/bmis/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tbmi WHERE userKey = ? ORDER BY date ASC', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler BMI');
    } else {
      res.json(results);
    }
  });
});

app.get('/weight/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tweight WHERE userKey = ? ORDER BY date DESC LIMIT 1', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Gewicht');
    } else {
      res.json(results);
    }
  });
});

app.get('/weights/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tweight WHERE userKey = ? ORDER BY date ASC', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Gewicht');
    } else {
      res.json(results);
    }
  });
});


app.post('/change-password', (req, res) => {
  const { oldPassword, newPassword, userId } = req.body;

  connection.query('SELECT memPassword FROM tmember WHERE memKey = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      return res.status(500).json({ message: 'Server-Fehler beim Abrufen des Benutzers' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const user = results[0];

    bcrypt.compare(oldPassword, user.memPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Vergleichen der Passwörter' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Altes Passwort ist falsch' });
      }

      bcrypt.hash(newPassword, saltRounds, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: 'Fehler beim Hashen des neuen Passworts' });
        }

        connection.query('UPDATE tmember SET memPassword = ? WHERE memKey = ?', [hash, userId], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Fehler beim Aktualisieren des Passworts' });
          }

          res.status(200).json({ message: 'Passwort erfolgreich geändert' });
        });
      });
    });
  });
});


app.get('/calories/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tcalories WHERE userKey = ? ORDER BY date DESC LIMIT 1', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Kalorien');
    } else {
      res.json(results);
    }
  });
});

app.get('/allcalories/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM tcalories WHERE userKey = ? ORDER BY date ASC', [userId], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Kalorien');
    } else {
      res.json(results);
    }
  });
});


app.get('/food2user/:userId/:date', (req, res) => {
  const userId = req.params.userId;
  const date = req.params.date;

  connection.query(` 
    SELECT fu.ftuKey, fu.ftuUser, fu.ftuDate, f.fodCode, f.fodName, m.mealName, fu.ftuQuantity, f.fodKcal, f.fodCarbs, f.fodProtein, f.fodFat
    FROM tfood2user fu
    INNER JOIN tfood f ON fu.ftuCode = f.fodCode
    LEFT JOIN tmeal m ON fu.ftuMeal = m.mealKey
    WHERE fu.ftuUser = ? AND DATE(fu.ftuDate) = ?`,
    [userId, date],
    (err, results) => {
      if (err) {
        console.error('Fehler bei der SQL-Abfrage:', err);
        res.status(500).send('Server-Fehler tfood2user');
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/food2user/:ftuKey', (req, res) => {
  const ftuKey = req.params.ftuKey;

  connection.query(` 
    SELECT fu.ftuKey, fu.ftuUser, fu.ftuDate, f.fodCode, f.fodName, m.mealName, fu.ftuQuantity, f.fodKcal, f.fodCarbs, f.fodProtein, f.fodFat
    FROM tfood2user fu
    INNER JOIN tfood f ON fu.ftuCode = f.fodCode
    LEFT JOIN tmeal m ON fu.ftuMeal = m.mealKey
    WHERE fu.ftuKey = ?`,
    [ftuKey],
    (err, results) => {
      if (err) {
        console.error('Fehler bei der SQL-Abfrage:', err);
        res.status(500).send('Server-Fehler tfood2user');
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/meal', (req, res) => {
  connection.query('SELECT * FROM tmeal', (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Mahlzeiten');
    } else {
      res.json(results);
    }
  });
});


app.get('/food/:fodCode', (req, res) => {
  const fodCode = req.params.fodCode;

  connection.query('SELECT * FROM tfood WHERE fodCode = ?', [fodCode], (err, results) => {
    if (err) {
      console.error('Fehler bei der SQL-Abfrage:', err);
      res.status(500).send('Server-Fehler Food');
    } else {
      res.json(results);
    }
  });
});

app.put('/food/:fodCode', (req, res) => {
  const fodCode = req.params.fodCode;
  const { foodName, kcal, carbs, protein, fat } = req.body;

  connection.query('UPDATE tfood SET fodName = ?, fodKcal = ?, fodCarbs = ?, fodProtein = ?, fodFat = ? WHERE fodCode = ?',
    [foodName, kcal, carbs, protein, fat, fodCode],
    (err) => {
      if (err) {
        console.error('Fehler beim Aktualisieren der Lebensmittelinformationen:', err);
        res.status(500).json({ message: 'Fehler beim Aktualisieren der Lebensmittelinformationen' });
      } else {
        res.status(200).json({ message: 'Lebensmittelinformationen erfolgreich aktualisiert' });
      }
    });
});

app.put('/food2user/:ftuKey', (req, res) => {
  const ftuKey = req.params.ftuKey;
  const { meal, quantity, date } = req.body;

  connection.query('UPDATE tfood2user SET ftuMeal = ?, ftuQuantity = ?, ftuDate = ? WHERE ftuKey = ?',
    [meal, quantity, date, ftuKey],
    (err) => {
      if (err) {
        console.error('Fehler beim Aktualisieren der Lebensmittelinformationen:', err);
        res.status(500).json({ message: 'Fehler beim Aktualisieren der Lebensmittelinformationen' });
      } else {
        res.status(200).json({ message: 'Lebensmittelinformationen erfolgreich aktualisiert' });
      }
    });
});


app.delete('/food2user/:ftuKey', (req, res) => {
  const ftuKey = req.params.ftuKey;

  connection.query('DELETE FROM tfood2user WHERE ftuKey = ?', [ftuKey], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen der Mahlzeit:', err);
      res.status(500).json({ message: 'Fehler beim Löschen der Mahlzeit' });
    } else {
      res.status(200).json({ message: 'Mahlzeit erfolgreich gelöscht' });
    }
  });
});


app.delete('/deletebmis/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('DELETE FROM tbmi WHERE userKey = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen der Bmi-Daten:', err);
      res.status(500).json({ message: 'Fehler beim Löschen der Bmi-Daten' });
    } else {
      res.status(200).json({ message: 'Bmi-Daten erfolgreich gelöscht' });
    }
  });
});

app.delete('/deleteweights/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('DELETE FROM tweight WHERE userkey = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen der Gewichts-Daten:', err);
      res.status(500).json({ message: 'Fehler beim Löschen der Gewichts-Daten' });
    } else {
      res.status(200).json({ message: 'Gewichts-Daten erfolgreich gelöscht' });
    }
  });
});


app.delete('/deletecalories/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('DELETE FROM tcalories WHERE userKey = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen der Kalorien-Daten:', err);
      res.status(500).json({ message: 'Fehler beim Löschen der Kalorien-Daten' });
    } else {
      res.status(200).json({ message: 'Kalorien-Daten erfolgreich gelöscht' });
    }
  });
});

app.delete('/deleteprofile/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('DELETE FROM tmember WHERE memKey = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen des Profils:', err);
      res.status(500).json({ message: 'Fehler beim Löschen des Profils' });
    } else {
      res.status(200).json({ message: 'Profil erfolgreich gelöscht' });
    }
  });
});



app.listen(3000, () => {
  console.log('Express-Server läuft auf Port 3000');
});