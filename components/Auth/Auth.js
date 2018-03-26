const express = require('express');
const passport = require('passport');
const Joi = require('joi');

const router = express.Router();

const validateForm = (req, res, next) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
  };

  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .trim()
      .required(),
  });

  Joi.validate(user, schema, (err, value) => {
    if (err) {
      return res.json(err.details[0]);
    }

    if (!value) return false;
    return next();
  });
};

router.post(
  '/register',
  validateForm,
  (req, res) => {
    passport.authenticate('local-register', (err, user, info) => {
      // if error return an internal server error
      if (err) return res.json(err);
      // if user is not returned send info why
      if (!user) return res.json(info);
      // success
      return res.json(user.email);
    })(req);
  },
);

router.post(
  '/login',
  validateForm,
  (req, res) => {
    passport.authenticate('local-login', (err, user, info) => {
      // if error return an internal server error
      if (err) return res.status(500).json(err);
      // if user does not exist, failure redirect
      if (!user) return res.json(info);
      // success
      return res.json(user);
    })(req, res);
  },
);

module.exports = router;
