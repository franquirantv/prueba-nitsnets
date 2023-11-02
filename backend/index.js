const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

let sql;
const db = new sqlite3.Database('./character.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
    console.error(err.message);
    }
});


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/characters', require('./routes/character'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
