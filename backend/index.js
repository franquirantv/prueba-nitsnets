const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/characters', require('./routes/character'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
