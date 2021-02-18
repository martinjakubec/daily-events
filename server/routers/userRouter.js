const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/:username', async (req, res, next) => {
  const username = req.params.username;
  const token = req.headers.authorization;
  const userData = jwt.decode(token);

  try {
    const userFromDb = await UserModel.findOne({username}, {password: 0, _id: 0, __v: 0});

    if (userFromDb === null) {
      res.json({status: 'error', error: 'User does not exist'});
    }

    if (username === userData.username) {
      if (jwt.verify(token, JWT_SECRET)) {
        return res.json(userFromDb);
      } else {0
        return res.json({
          username: userFromDb.username,
          eventsCreated: userFromDb.eventsCreated,
        });
      }
    } else {
      return res.json({
        username: userFromDb.username,
        eventsCreated: userFromDb.eventsCreated,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/register', async (req, res, next) => {
  const {username, password, mail, role = 'user'} = req.body;
  if (username && password && mail) {
    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = {
        username,
        password: hashedPassword,
        mail,
        role,
      };
      await UserModel.create(user);
      return res.json({status: 'ok', data: 'User successfully registered.'});
    } catch (err) {
      if (err.code === 11000) {
        let [key] = Object.entries(err.keyPattern)[0];
        let errorMessage;
        switch (key) {
          case 'username':
            errorMessage = 'Username already exists.';
            break;
          case 'mail':
            errorMessage = 'E-mail already in use.';
            break;
        }
        return res.json({status: 'error', error: errorMessage});
      }
      console.log(JSON.stringify(err));
      return res.json({
        status: 'error',
        error: 'Something went wrong, please, try again later.',
      });
    }
  } else {
    return res.json({
      status: 'error',
      error: 'Your data is incomplete or corrupted, check your headers.',
    });
  }
});

router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  try {
    const userFromDb = await UserModel.findOne({username});
    if (userFromDb === null) {
      return res.json({
        status: 'error',
        error: 'Invalid username/password combination.',
      });
    }
    if (await bcrypt.compare(password, userFromDb.password)) {
      const token = jwt.sign(
        {username: userFromDb.username, role: userFromDb.role},
        JWT_SECRET,
        {expiresIn: '1h'}
      );
      return res.json({status: 'ok', data: token});
    } else {
      return res.json({
        status: 'error',
        error: 'Invalid username/password combination.',
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: 'Could not log you in, try again later.',
    });
  }
});

router.post('/validateToken', async (req, res, next) => {
  const {token} = req.body;
  try {
    if (jwt.verify(token, JWT_SECRET)) {
      return res.json({
        status: 'ok',
        data: 'Your token is validated, continue with using the site.',
      });
    } else {
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    return res.json({
      status: 'error',
      error: 'Your token is invalid, please, login again.',
    });
  }
});

router.post('/delete', async (req, res, next) => {
  const {username} = req.body;
  try {
    const deletedUser = await UserModel.deleteOne({username});
    if (deletedUser.deletedCount === 0) {
      return res.json({status: 'error', error: 'User does not exist.'});
    }
    return res.json({status: 'ok', data: 'User successfully deleted.'});
  } catch (err) {
    return res.json({status: 'error', error: 'User could not be deleted.'});
  }
});

module.exports = router;
