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
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  Joi.validate(user, schema, (err, value) => {
    if (err) {
      return res.json(err.details[0]);
    }
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
      return res.json(user.displayName);
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
