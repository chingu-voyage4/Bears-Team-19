const express = require('express');
const passport = require('passport');
const Joi = require('joi');

const router = express.Router();

const validateForm = (req, res, next) => {
  const { username, password } = req.body;

  const user = {
    username,
    password,
  };

  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,15}/)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .required(),
  });

  Joi.validate(user, schema, (err, value) => {
    if (err) {
      return res.status(400).json(err.details[0]);
    }

    if (!value) return false;
    return next();
  });
};

router.post(
  '/login',
  validateForm,
  (req, res) => {
    passport.authenticate('local-login', (err, user, info) => {
      // if error return an internal server error
      if (err) return res.status(500).json(err);
      // if user is not returned send info why
      if (!user) return res.status(400).json(info);
      // success

      return req.logIn(user, (loginErr) => {
        if (loginErr) { return loginErr; }

        const {
          username,
          email,
          dateJoined,
          updatedAt,
        } = req.user;

        const results = {
          username,
          email,
          dateJoined,
          updatedAt,
        };

        return res.status(200).json(results);
      });
    })(req, res);
  },
);

router.post('/logout', (req, res) => {
  if (!req.user) return res.status(400).json({ message: 'User is not logged in.' });
  req.logout();
  return res.status(200).json({ message: 'Logout successful.' });
});

module.exports = router;
