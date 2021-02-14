require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION_URL;

mongoose.connect(
  DB_URL,
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
  () => {
    console.log('database connected');
  }
);

const app = express();
app.use(helmet());



app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));

const eventRouter = require('./routers/eventRouter');

app.use('/events', eventRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
