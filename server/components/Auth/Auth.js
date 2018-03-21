const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/register',
  (req, res) => {
    passport.authenticate('local-register', (err, user, info, status) => {

      console.log(err, user, info, status, 'this is err and user');
      // if error return an internal server error
      if (err) return res.json(err);
      // if user does not exist, send err message
      if (!user) return res.json(info);
      // success
      return res.json(user.displayName);
    })(req);
  },
);

router.post(
  '/login',
  (req, res) => {
    passport.authenticate('login-login', (err, user, info) => {
      console.log(info);
      // if error return an internal server error
      if (err) return res.status(500).json(err);
      // if user does not exist, failure redirect
      if (!user) return res.redirect('/');
      // success
      res.cookie(user);
      return res.json(user);
    })(req, res);
  },
);

module.exports = router;
