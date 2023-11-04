const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/characters', require('./routes/character'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
