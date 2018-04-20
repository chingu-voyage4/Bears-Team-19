const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/login',
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
