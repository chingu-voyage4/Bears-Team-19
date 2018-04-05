const express = require('express');
const User = require('./usermodel.js');
const Joi = require('joi');

const router = express.Router();

const validateForm = (req, res, next) => {
  const { username, email, password } = req.body;

  const user = {
    username,
    email,
    password,
  };

  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/^[a-z0-9]{5,15}/)
      .min(5)
      .max(15)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(15)
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

function createUser(req, done) {
  const { username, email, password } = req.body;
  User.find({ $or: [{ username }, { email }] })
    .then((data) => {
      if (data.length === 0) {
        const user = {
          username,
          email,
          password,
        };

        const newUser = new User(user);

        return newUser.save((err) => {
          if (err) return done(false, err, { message: 'Error whilst saving' });
          return done(null, newUser);
        });
      }
      const err = {
        message: 'User exists',
      };
      return done(null, false, err);
    })
    .catch((err) => {
      done(err);
    });
}

/* GET home page. */
router.post(
  '/create',
  validateForm,
  (req, res) => {
    createUser(req, (err, user, message) => {
      // if error return an internal server error
      if (err) return res.json(err);
      // if user is not returned send info why
      if (!user) return res.status(400).json(message);
      // success

      const success = {
        success: 'User successfully registered.',
      };

      return res.status(201).json(success);
    });
  },
);

module.exports = router;
