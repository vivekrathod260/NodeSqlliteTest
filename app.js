const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err)=>{ if(err) console.log(err); else console.log('Connected'); });

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    )
`);

app.get('/', (req, res) => {
    db.all(`SELECT * FROM users`, (err, rows) => {
        if(err) console.log(err);

        console.log('Users:');
        rows.forEach(row => {
            console.log(`${row.id}, ${row.name}, ${row.email}`);
        });
    });
    
    res.send('Hello');
});

app.get('/insert', (req, res)=>{
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['John Doe', 'john@example.com'], (err) => {
        if(err) console.log(err);

        console.log('inserted');
    });
    res.send("ok");
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

