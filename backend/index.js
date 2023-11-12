// app.js

const constants = require('./constants'); // Importa las constantes desde el archivo constants.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { PORT, MAX_SIZE_UPLOAD } = constants; // Desestructura las constantes desde el objeto importado

const app = express();
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: MAX_SIZE_UPLOAD * 1024 * 1024 }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/characters', require('./routes/character'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
