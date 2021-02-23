require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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
const helmetDirectives = require('./helmet-setup/directives');
app.use(helmet(helmetDirectives));
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));

const eventRouter = require('./routers/eventRouter');
const userRouter = require('./routers/userRouter');

app.use('/api/events', eventRouter);
app.use('/api/', userRouter);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
