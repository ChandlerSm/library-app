import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, './database/database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.log("Error connecting to DB");
    }
    else {
      console.log("Connected to db.")
    }
  });

db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `)

db.exec(`
        CREATE TABlE IF NOT EXISTS library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            imageURL TEXT,
            posterID INTEGER,
            FOREIGN KEY (posterID) REFERENCES user(id)
        )
    `)

db.on('open', () => {
  console.log('Database connected successfully!');
});

export default db;