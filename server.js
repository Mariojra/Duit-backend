require('dotenv').config({path: './.env.local'});
require('./config/db');
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./routes/index'));

// app.get('/', (req, res) => {
//     res.send('hola');
// });

app.listen( process.env.PORT, () =>{
    console.log('Servidor en el puerto: ', process.env.PORT);
});
