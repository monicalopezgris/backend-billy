const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
  isLoggedIn,
  isNotLoggedIn,
} = require('../helpers/middelwares');
const {
  signUpValidator,
  logInValidator,
} = require('../helpers/validators/auth');

router.get('/me',
  isLoggedIn(),
  (req, res, next) => {
    try {
      res.json(req.session.currentUser);
    } catch (error) {
      next(createError(404))
    }
  });

router.post(
  '/login',
  isNotLoggedIn(),
  logInValidator,
  async (req, res, next) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(422));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(createError(404));
    }
  },
);

router.post(
  '/signup',
  isNotLoggedIn(),
  signUpValidator,
  async (req, res, next) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    try {
      const user = await User.findOne({ username }, 'username');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(createError(404));
    }
  },
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(204).send();
  } catch (error) {
    next(createError(404))
  }

});

router.get(
  '/meData',
  isLoggedIn(),
  async (req, res, next) => {
    const { _id: id } = req.session.currentUser;
    try {
      const user = await User.findById(id);
      if (!user) {
        next(createError(403));
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      next(createError(404));
    }
  },
);

module.exports = router;
