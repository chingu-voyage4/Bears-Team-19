const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../User/UserModel.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      // User does not exist
      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      // Password does not match
      user.verifyPassword(password, (err, isMatch) => {
        if (err) return done(null, false, { message: err });
        if (!isMatch) return done(null, false, { message: 'Password does not match' });
        // password matches return
        return done(null, user);
      });
    })
    .catch(err => done(err));
}));

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, ((email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          const newUser = {
            email,
            password,
          };

          const userSave = new User(newUser);
          userSave.save();
          return done(null, userSave);
        }

        const err = {
          message: 'User exists',
        };
        return done(null, false, err);
      })
      .catch(err => done(err));
  })));
