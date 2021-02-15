const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


router.post('/register', async (req, res, next) => {
  const {username, password, mail, role = 'user'} = req.body;
  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
      username,
      password: hashedPassword,
      mail,
      role
    }
    await UserModel.create(user);
    return res.json('sure, you got here well');
  } catch (err) {
    if (err.code === 11000) {
      let [key, ] = Object.entries(err.keyPattern)[0];
      let errorMessage;
      switch(key) {
        case 'username':
          errorMessage = 'Username already exists.';
          break;
        case 'mail':
          errorMessage = 'E-mail already in use.';
          break;
      }
      return res.json({status: 'error', error: errorMessage});
    }
    return res.json({status: 'error', error: 'Something went wrong, please, try again later.'});
  }
});

module.exports = router;
