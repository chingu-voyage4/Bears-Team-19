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
      .regex(/^[a-z0-9]{5,15}/)
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
    passport.authenticate('local-login', (err, user, message, status) => {
      // if error return an internal server error
      if (err) return res.status(status).json(err);
      // if user is not returned send info why
      if (!user) return res.status(400).json(message);
      // success

      req.logIn(user, (err) => {
        if (err) { return next(err); }

        const {
          username, email, date_joined, updatedAt,
        } = req.user;

        const results = {
          username,
          email,
          date_joined,
          updatedAt,
        };

        return res.status(200).json(results);
      });
    })(req, res);
  },
);

module.exports = router;
